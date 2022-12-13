import { UnstyledButton } from '@/components/UI/buttons'
import { PRButton } from '@/components/content'
import { AuthorSection, GiscusComment, HeadingContent } from '@/components/content/blog'
import { MDXComponents } from '@/components/content/mdx'

import { LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContentBySlug, getContents } from '@/services/content'

import { isDev } from '@/libs/constants/environmentState'
import { getMetaPageBlog } from '@/libs/metapage'
import { twclsx } from '@/libs/twclsx'

import axios from 'axios'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { HiArrowUp } from 'react-icons/hi'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
import type { Blog, PageViewResponse } from 'rizkicitra'

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  header: Blog
}

interface slug extends ParsedUrlQuery {
  slug: string
}

const BlogPost: NextPage<BlogPostProps> = ({ header, mdxSource }) => {
  const [postViews, setPostViews] = useState<number>(0)
  const metaData = getMetaPageBlog({
    ...header,
    slug: '/blog/' + header.slug
  })
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  useEffect(() => {
    // run only on client side
    if (typeof window !== 'undefined') {
      if (isDev) return
      ;(async () => {
        try {
          const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rizkicitra.dev'
          const res = await axios.get<PageViewResponse>(baseURL + '/api/pageviews?slug=' + header.slug)
          const view = res.data.view ?? 0
          setPostViews(view)
        } catch (error) {
          console.info('Could not retrieve page views')
        }
      })()
    }
  }, [header.slug])

  return (
    <LayoutPage {...(metaData as LayoutPageProps)} className='pb-4'>
      <article className={twclsx('content-auto', 'flex flex-col', 'gap-8')}>
        <HeadingContent
          topics={header.topics}
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

      <GiscusComment />

      <div className='flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:items-center md:justify-between mt-2'>
        <PRButton path={`/blog/${header.slug}.mdx`} />

        <UnstyledButton
          onClick={toTop}
          className='justify-start space-x-1.5 py-1 max-w-max border-b-2 border-dashed border-theme-500'
        >
          <HiArrowUp className='w-4 h-4' />
          <span>Back to top</span>
        </UnstyledButton>
      </div>
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
