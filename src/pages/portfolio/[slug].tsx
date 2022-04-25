import IconFinder from '@/components/atoms/IconFinder'
import UnderlineLink from '@/components/mollecules/UnderlineLink'
import MDXComponents from '@/components/organism/MDXComponents'
import ContentImage from '@/components/organism/MDXComponents/ContentImage'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import getPortfolio, { getPortfolioBySlug } from '@/helpers/getPortfolio'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaData } from '@/libs/metaData'

import clsx from 'clsx'
import { LayoutProps } from 'framer-motion'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import 'prism-themes/themes/prism-night-owl.css'
import { ParsedUrlQuery } from 'querystring'
import { HiGlobeAlt } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'

const BackToTop = dynamic(() => import('@/components/atoms/BackToTop'))

interface ProjectDetailPageProps {
  header: PortfolioHeadProps
  mdxSource: MDXRemoteSerializeResult
}

const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({ header, mdxSource }) => {
  const metaData = getMetaData({
    title: header.title,
    description: header.summary,
    og_image: header.image,
    og_image_alt: header.title,
    keywords: header.stack,
    slug: '/portfolio/' + header.slug
  })

  return (
    <Layout {...(metaData as LayoutProps)}>
      <BackToTop />

      <article className={clsx('flex flex-col', 'gap-8')}>
        <section className={clsx('pb-8 border-b', 'border-theme-300 dark:border-theme-700')}>
          <h1 className={clsx('max-w-prose text-3xl md:text-5xl')}>{header.title}</h1>
          <p className={clsx('w-full my-8')}>{header.summary}</p>
          <div className='flex items-center gap-4'>
            <UnderlineLink
              href={header.link.github}
              className='max-w-max gap-2 py-1 text-theme-700 dark:text-theme-200'
            >
              <SiGithub className='text-lg md:text-xl text-theme-800 dark:text-theme-200' />
              <span className='text-sm md:text-base'>Repository</span>
            </UnderlineLink>
            <UnderlineLink href={header.link.live} className='max-w-max gap-2 py-1 text-theme-700 dark:text-theme-200'>
              <HiGlobeAlt className='text-lg md:text-xl text-theme-800 dark:text-theme-200' />
              <span className='text-sm md:text-base'>Live Demo</span>
            </UnderlineLink>
          </div>
        </section>

        <section className={clsx('flex flex-col gap-4', 'md:flex-row md:items-center md:justify-between')}>
          <div className={clsx('flex items-center gap-3', 'w-full')}>
            {header.stack.map((s) => (
              <span className='text-2xl' key={s}>
                <IconFinder type={s} />
              </span>
            ))}
          </div>

          <div className={clsx('w-full md:text-right')}>
            <time className='text-sm md:text-base' dateTime={dateStringToISO(header.date)}>
              {dateFormat(header.date, undefined, { dateStyle: 'medium' })}
            </time>
          </div>
        </section>

        <figure className='relative w-full h-56 md:h-96'>
          <ContentImage title={header.title} alt={header.title} src={header.image} />
        </figure>

        <section className='prose dark:prose-invert md:prose-lg'>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </section>

        <section className={clsx('flex items-center gap-8')}>
          <UnderlineLink
            href={`https://github.com/rizkimcitra/rizkicitra/edit/main/src/data/portfolio/${header.slug}.mdx`}
          >
            Edit this on GitHub
          </UnderlineLink>
        </section>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const portfolio = await getPortfolio()

  const paths = portfolio.map((p) => ({ params: { slug: p.slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async (ctx) => {
  const mdxPrism = await require('mdx-prism')
  const { slug } = ctx.params as ParsedUrlQuery & { slug: string }

  const res = await getPortfolioBySlug(slug)

  const mdxSource = await serialize(res.content, { mdxOptions: { rehypePlugins: [mdxPrism] } })

  return {
    props: {
      header: res.header,
      mdxSource
    }
  }
}

export default ProjectDetailPage
