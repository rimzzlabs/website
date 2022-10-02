import { ContentImage, HeadingPortfolio, IconStack, MDXComponents, PRButton } from '@/components/content'

import { BackToTop } from '@/UI/buttons'
import { LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContentBySlug, getContents } from '@/services'

import { dateFormat, dateStringToISO } from '@/libs/intl'
import { getMetaPage } from '@/libs/metapage'
import { twclsx } from '@/libs/twclsx'

import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import type { ParsedUrlQuery } from 'querystring'
import { HiOutlineCalendar } from 'react-icons/hi'
import rehypeSlug from 'rehype-slug'
import type { Portfolio } from 'rizkicitra'

type ProjectDetailPageProps = {
  header: Portfolio
  mdxSource: MDXRemoteSerializeResult
}

const transition = { ease: 'anticipate', duraition: 0.65 }

const articleV: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
}

const toUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const stackParent: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const stack: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition }
}

const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({ header, mdxSource }) => {
  const metaData = getMetaPage({
    title: header.title,
    description: header.summary,
    og_image: header.image,
    og_image_alt: header.title,
    keywords: header.stack,
    slug: '/portfolio/' + header.slug
  })

  return (
    <LayoutPage {...(metaData as LayoutPageProps)}>
      <BackToTop />

      <m.article initial='hidden' animate='visible' variants={articleV} className={twclsx('flex flex-col', 'gap-8')}>
        <HeadingPortfolio {...header} />

        <section className={twclsx('flex flex-col gap-4', 'md:flex-row md:items-center md:justify-between')}>
          <m.div variants={stackParent} className={twclsx('flex items-center gap-3', 'w-full')}>
            {header.stack.map((s) => (
              <m.span variants={stack} className={twclsx('text-2xl')} key={s}>
                <IconStack type={s} />
              </m.span>
            ))}
          </m.div>

          <m.div
            variants={toUp}
            className={twclsx('flex items-center justify-start', 'w-full gap-2', 'md:text-right md:justify-end')}
          >
            <HiOutlineCalendar className={twclsx('text-lg')} />
            <time className={twclsx('text-sm md:text-base')} dateTime={dateStringToISO(header.date)}>
              {dateFormat(header.date, undefined, { dateStyle: 'medium' })}
            </time>
          </m.div>
        </section>

        <m.figure variants={toUp} className={twclsx('relative', 'w-full', 'h-56 md:h-96', 'my-4')}>
          <ContentImage title={header.title} alt={header.title} src={header.image} />
        </m.figure>

        <m.section variants={toUp} className={twclsx('prose', 'dark:prose-invert', 'md:prose-lg')}>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </m.section>

        <PRButton path={`/portfolio/${header.slug}.mdx`} />
      </m.article>
    </LayoutPage>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const portfolio = await getContents<Portfolio>('/portfolio')

  const paths = portfolio.map((p) => ({ params: { slug: p.header.slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async (ctx) => {
  const mdxPrism = await require('mdx-prism')
  const { slug } = ctx.params as ParsedUrlQuery & { slug: string }

  const res = await getContentBySlug<Portfolio>('/portfolio', slug)

  const mdxSource = await serialize(res.content, { mdxOptions: { rehypePlugins: [mdxPrism, rehypeSlug] } })

  return {
    props: {
      header: res.header,
      mdxSource
    }
  }
}

export default ProjectDetailPage
