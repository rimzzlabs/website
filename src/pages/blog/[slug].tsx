import { ContentImage, GiscusComment, MDXComponents, PRButton } from '@/components/content'

import { BackToTop } from '@/UI/buttons'
import { CustomImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'
import { LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContentBySlug, getContents } from '@/services/content'
import { umamiClient } from '@/services/umami'

import { isProd } from '@/libs/constants/environmentState'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaDataBlog } from '@/libs/metaData'
import { twclsx } from '@/libs/twclsx'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineEye } from 'react-icons/hi'
import readingTime from 'reading-time'
import type { Blog } from 'rizkicitra'

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  header: Blog
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
    if (isProd) {
      ;(async () => {
        try {
          const response = await umamiClient.get<HTTP>('/api/umami/blogviews?slug=' + header.slug)

          setPostViews(response.data.data ?? 0)
        } catch (error) {
          console.info('Could not retrieve page views')
        }
      })()
    }
  }, [header.slug])

  return (
    <LayoutPage {...(metaData as LayoutPageProps)}>
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
              <p>
                Written by /{' '}
                <UnderlineLink href={header.author_url} title={header.author_name}>
                  {header.author_name}
                </UnderlineLink>
              </p>
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

      <PRButton path={`/blog/${header.slug}.mdx`} />

      <GiscusComment />
    </LayoutPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getContents<Blog>('/blog')

  const paths = res.map((r) => ({ params: { slug: r.header.slug } })) as GetStaticPathsResult['paths']

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = ctx.params as slug

  const res = await getContentBySlug<Blog>('/blog', slug)
  const est_read = readingTime(res.content).text

  const mdxSource = await serialize(res.content, {
    mdxOptions: { rehypePlugins: [mdxPrism] }
  })

  return {
    props: {
      header: { est_read, ...res.header },
      mdxSource
    }
  }
}

export default BlogPost
