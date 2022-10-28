import { PRButton } from '@/components/content'
import { AuthorSection, GiscusComment, HeadingContent } from '@/components/content/blog'
import { MDXComponents } from '@/components/content/mdx'

import { BackToTop } from '@/UI/buttons'
import { LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContentBySlug, getContents } from '@/services/content'
import { umamiClient } from '@/services/umami'

import { isProd } from '@/libs/constants/environmentState'
import { getMetaPageBlog } from '@/libs/metapage'
import { twclsx } from '@/libs/twclsx'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
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

  const metaData = getMetaPageBlog({
    ...header,
    slug: '/blog/' + header.slug
  })

  useEffect(() => {
    // run only on client side
    if (isProd && typeof window !== 'undefined') {
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
      <article className={twclsx('content-auto', 'flex flex-col', 'gap-8')}>
        <HeadingContent
          est_read={header.est_read}
          postViews={postViews}
          published={header.published}
          summary={header.summary}
          title={header.title}
        />

        <AuthorSection name={header.author_name} username={header.github_username} />

        <div
          className={twclsx('prose dark:prose-invert', 'md:prose-lg', 'prose-headings:scroll-mt-24', 'prose-img:my-4')}
        >
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </article>

      <BackToTop />

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
