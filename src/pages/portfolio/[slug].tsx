import IconFinder from '@/components/atoms/IconFinder'
import EditButton from '@/components/mollecules/EditButton'
import UnderlineLink from '@/components/mollecules/UnderlineLink'
import MDXComponents from '@/components/organism/MDXComponents'
import ContentImage from '@/components/organism/MDXComponents/ContentImage'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import getPortfolio, { getPortfolioBySlug } from '@/helpers/getPortfolio'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaData } from '@/libs/metaData'
import { twclsx } from '@/libs/twclsx'

import { LayoutProps } from 'framer-motion'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { HiGlobeAlt, HiOutlineCalendar } from 'react-icons/hi'
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

      <article className={twclsx('flex flex-col', 'gap-8')}>
        <section className={twclsx('pb-8 border-b', 'border-theme-300 dark:border-theme-700')}>
          <h1 className={twclsx('max-w-prose text-3xl md:text-5xl')}>{header.title}</h1>
          <p className={twclsx('w-full my-8')}>{header.summary}</p>

          <div className={twclsx('flex items-center', 'gap-4')}>
            <UnderlineLink
              href={header.link.github}
              className={twclsx('max-w-max', 'gap-2 py-1', 'text-theme-700 dark:text-theme-200')}
            >
              <SiGithub className={twclsx('text-lg md:text-xl', 'text-theme-800 dark:text-theme-200')} />
              <span className={twclsx('text-sm md:text-base')}>Repository</span>
            </UnderlineLink>

            <UnderlineLink href={header.link.live} className='max-w-max gap-2 py-1 text-theme-700 dark:text-theme-200'>
              <HiGlobeAlt className={twclsx('text-lg md:text-xl', 'text-theme-800 dark:text-theme-200')} />
              <span className={twclsx('text-sm md:text-base')}>Live Demo</span>
            </UnderlineLink>
          </div>
        </section>

        <section className={twclsx('flex flex-col gap-4', 'md:flex-row md:items-center md:justify-between')}>
          <div className={twclsx('flex items-center gap-3', 'w-full')}>
            {header.stack.map((s) => (
              <span className={twclsx('text-2xl')} key={s}>
                <IconFinder type={s} />
              </span>
            ))}
          </div>

          <div className={twclsx('flex items-center justify-start', 'w-full gap-2', 'md:text-right md:justify-end')}>
            <HiOutlineCalendar className={twclsx('text-lg')} />
            <time className={twclsx('text-sm md:text-base')} dateTime={dateStringToISO(header.date)}>
              {dateFormat(header.date, undefined, { dateStyle: 'medium' })}
            </time>
          </div>
        </section>

        <figure className={twclsx('relative', 'w-full', 'h-56 md:h-96', 'my-4')}>
          <ContentImage title={header.title} alt={header.title} src={header.image} />
        </figure>

        <section className={twclsx('prose', 'dark:prose-invert', 'md:prose-lg')}>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </section>

        <EditButton path={`/portfolio/${header.slug}.mdx`} />
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
