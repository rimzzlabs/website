import IconFinder from '@/components/atoms/IconFinder'
import MDXComponents from '@/components/organism/MDXComponents'
import Layout from '@/components/templates/Layout'

import { Snippets } from '@/data/snippets/snippets.type'
import { getSnippets, getSnippetsBySlug } from '@/helpers/getSnippets'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaData } from '@/libs/metaData'
import { twclsx } from '@/libs/twclsx'

import { LayoutProps } from 'framer-motion'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import 'prism-themes/themes/prism-night-owl.css'
import { ParsedUrlQuery } from 'querystring'

interface SnippetsDetailPageProps {
  header: Snippets
  mdxSource: MDXRemoteSerializeResult
}

interface Slug extends ParsedUrlQuery {
  slug: string
}

const SnippetsDetailPage: NextPage<SnippetsDetailPageProps> = ({ header, mdxSource }) => {
  const meta = getMetaData({
    title: header.title,
    template: 'Snippets | rizkicitra.dev',
    description: header.description,
    keywords: [header.tech],
    slug: '/snippets',
    og_image: '',
    og_image_alt: header.title,
    type: 'website'
  })

  return (
    <Layout {...(meta as LayoutProps)}>
      <article className={twclsx('flex flex-col', 'gap-10')}>
        <section className={twclsx('pb-4', 'border-b', 'border-theme-300 dark:border-theme-700')}>
          <h1 className={twclsx('max-w-prose', 'text-3xl md:text-5xl')}>{header.title}</h1>
          <p className={twclsx('mt-4 mb-8 md:mt-4')}>{header.description}</p>

          <div className={twclsx('flex items-center justify-between', 'gap-2')}>
            <IconFinder type={header.tech} className={twclsx('w-8 md:w-10 h-8 md:h-10')} />
            <time dateTime={dateStringToISO(header.date)}>
              {dateFormat(header.date, undefined, { dateStyle: 'medium' })}
            </time>
          </div>
        </section>

        <section className={twclsx('prose dark:prose-invert', 'md:prose-lg')}>
          <MDXRemote components={MDXComponents} {...mdxSource} />
        </section>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snippets = await getSnippets()

  const paths = snippets.map((s) => ({ params: { slug: s.slug } })) as GetStaticPathsResult['paths']

  return {
    fallback: false,
    paths
  }
}

export const getStaticProps: GetStaticProps<SnippetsDetailPageProps> = async (ctx) => {
  const mdxPrism = await require('mdx-prism')
  const { slug } = ctx.params as Slug

  const snippet = await getSnippetsBySlug(slug)

  const mdxSource = await serialize(snippet.content, {
    mdxOptions: { rehypePlugins: [mdxPrism] }
  })

  return {
    props: {
      header: snippet.header,
      mdxSource
    }
  }
}

export default SnippetsDetailPage
