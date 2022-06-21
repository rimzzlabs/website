import BackToTop from '@/components/atoms/BackToTop'
import CustomImage from '@/components/atoms/CustomImage'
import EditButton from '@/components/mollecules/EditButton'
import MDXComponents from '@/components/organism/MDXComponents'
import ContentImage from '@/components/organism/MDXComponents/ContentImage'
import GiscusComment from '@/components/templates/GiscusComment'
import Layout from '@/components/templates/Layout'

import { Blogs } from '@/data/blog/blog.type'
import { getBlog, getBlogBySlug } from '@/helpers/getBlog'
import { isProd } from '@/libs/constants/environmentState'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaDataBlog } from '@/libs/metaData'
import { twclsx } from '@/libs/twclsx'
import umamiClient from '@/libs/umamiClient'

import { LayoutProps } from 'framer-motion'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineEye } from 'react-icons/hi'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  header: Blogs
}

interface slug extends ParsedUrlQuery {
  slug: string
}

interface HTTP {
  status: boolean
  message: string
  data: number
}

const BlogPost: NextPage<BlogPostProps> = ({ header, mdxSource }) => {
  const [postViews, setPostViews] = useState<number>(0)

  const metaData = getMetaDataBlog({
    ...header,
    slug: '/blog/' + header.slug
  })

  const config: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  useEffect(() => {
    ;(async () => {
      if (isProd) {
        try {
          const response = await umamiClient.get<HTTP>('/api/umami/blogviews?slug=' + header.slug)

          setPostViews(response.data.data ?? 0)
        } catch (error) {
          console.info('Could not retrieve page views')
        }
      } else {
        setPostViews(0)
      }
    })()
  }, [header.slug])

  return (
    <Layout {...(metaData as LayoutProps)}>
      <BackToTop />
      <article className={twclsx('content-auto', 'flex flex-col', 'gap-8')}>
        <section className={twclsx('pb-8 border-b', 'border-theme-300 dark:border-theme-700')}>
          <h1 className={twclsx('max-w-prose', 'text-3xl md:text-5xl')}>{header.title}</h1>
          <p className={twclsx('mt-4 md:mt-8', 'mb-8')}>{header.summary}</p>

          <div className={twclsx('flex flex-col', 'gap-4', 'md:flex-row md:items-center md:justify-between')}>
            <div className={twclsx('flex items-center', 'gap-4')}>
              <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
                <HiOutlineClock className={twclsx('text-lg')} />
                <p>{header.est_read}</p>
              </div>

              <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
                <HiOutlineEye className={twclsx('text-lg')} />
                {postViews > 0 ? <p>{postViews} views</p> : <p>—</p>}
              </div>
            </div>
            <div className={twclsx('flex items-center', 'gap-2')}>
              <HiOutlineCalendar className={twclsx('text-lg')} />
              <time className={twclsx('text-sm md:text-base')} dateTime={dateStringToISO(header.published)}>
                {dateFormat(header.published, undefined, config)}
              </time>
            </div>
          </div>
        </section>

        <section className={twclsx('flex flex-col', 'gap-4')}>
          <div className={twclsx('flex flex-col', 'gap-4')}>
            <div className={twclsx('flex items-center', 'gap-4')}>
              <CustomImage
                display='intrinsic'
                className={twclsx('rounded-full')}
                src={header.author_image}
                width={32}
                height={32}
                alt={header.author_name}
              />
              <p>{header.author_name}</p>
            </div>
          </div>
        </section>

        {header.thumbnail && (
          <figure className={twclsx('relative', 'w-full', 'my-4')}>
            <ContentImage alt={header.title} src={header.thumbnail} title={header.title} />
          </figure>
        )}

        <section
          className={twclsx('prose dark:prose-invert', 'md:prose-lg', 'prose-headings:scroll-mt-24', 'prose-img:my-4')}
        >
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </section>
      </article>

      <EditButton path={`/blog/${header.slug}.mdx`} />

      <GiscusComment />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getBlog()

  const paths = res.map((r) => ({ params: { slug: r.header.slug } })) as GetStaticPathsResult['paths']

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async (ctx) => {
  const mdxPrism = await require('mdx-prism')

  const { slug } = ctx.params as slug

  const res = await getBlogBySlug(slug)
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

export default BlogPost
