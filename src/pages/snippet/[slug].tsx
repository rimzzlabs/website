import { CustomImage } from '@/components/UI/images'
import { UnderlineLink } from '@/components/UI/links'
import { IconStack, MDXComponents, PRButton } from '@/components/content'

import { LayoutPage } from '@/UI/templates'

import { getContentBySlug, getContents } from '@/services'

import { twclsx } from '@/libs'
import { generateOgImage, getMetaPage } from '@/libs/metapage'

import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import type { ParsedUrlQuery } from 'querystring'
import { useMemo } from 'react'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
import type { Snippet } from 'rizkicitra'

type SnippetPostProps = {
  header: Snippet
  mdxSource: MDXRemoteSerializeResult
}

const SnippetPostPage: NextPage<SnippetPostProps> = ({ header, mdxSource }) => {
  const githubAPI = useMemo(() => {
    return {
      profile: 'https://github.com/' + header.github_username,
      picture: 'https://github.com/' + header.github_username + '.png'
    }
  }, [header.github_username])
  const metaData = getMetaPage({
    title: header.title,
    description: header.summary,
    og_image: generateOgImage({ title: header.title, subTitle: 'Snippet - rizkicitra.dev' }),
    og_image_alt: header.title,
    keywords: [],
    slug: '/portfolio/' + header.slug
  })
  return (
    <LayoutPage {...metaData}>
      <section className={twclsx('pb-8')}>
        <div className='flex items-center justify-between'>
          <h1 className={twclsx('max-w-prose text-3xl md:text-5xl')}>{header.title}</h1>
          <IconStack type={header.topic} className='w-8 h-8 md:w-12 md:h-12' />
        </div>
        <p className='w-full my-4'>{header.summary}</p>

        <div className={twclsx('flex items-center', 'gap-4')}>
          <CustomImage
            display='intrinsic'
            className={twclsx('rounded-full')}
            src={githubAPI.picture}
            width={32}
            height={32}
            alt={header.author}
          />
          <p>
            Created by /{' '}
            <UnderlineLink href={githubAPI.profile} title={header.author}>
              {header.author}
            </UnderlineLink>
          </p>
        </div>
      </section>

      <section className={twclsx('prose', 'dark:prose-invert', 'md:prose-lg')}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </section>

      <div className='mt-8 mb-2'>
        <PRButton path={`/snippet/${header.slug}.mdx`} />
      </div>
    </LayoutPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getContents<Snippet>('/snippet')

  const paths = res.map((r) => ({ params: { slug: r.header.slug } })) as GetStaticPathsResult['paths']

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<SnippetPostProps> = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = ctx.params as { slug: string } & ParsedUrlQuery

  const res = await getContentBySlug<Snippet>('/snippet', slug)
  const est_read = readingTime(res.content).text

  const mdxSource = await serialize(res.content, {
    mdxOptions: { rehypePlugins: [mdxPrism, rehypeSlug] }
  })

  return {
    props: {
      header: { est_read, ...res.header },
      mdxSource
    }
  }
}

export default SnippetPostPage
