import { BlogList } from '@/components/content'

import { BlogCard } from '@/UI/cards'
import { EmptyResult, Spinner } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents, getPageViews, getToken } from '@/services'

import { SECRET_KEY, isDev, isProd } from '@/libs/constants/environmentState'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getMostPopularBlog, getNewestBlog } from '@/libs/sorters'
import { twclsx } from '@/libs/twclsx'

import { useSearch, useSearchBlog } from '@/hooks'

import { PageViewResponse } from '../api/pageviews/_type'

import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import readingTime from 'reading-time'
import type { Blog } from 'rizkicitra'

type BlogPageProps = {
  allBlogs: Array<Blog>
}

const meta = getMetaPage({
  title: 'Blog',
  description: `I write blog once a while, talks about Web Development related topics and my personal experience, feel free to explore my post.`,
  keywords: ['Rizki Maulana Citra', 'Rizki M Citra', 'Rizkicitra', 'Rizki Citra', 'rizkicitra.dev'],
  og_image: generateOgImage({
    title: 'Blog - rizkicitra.dev',
    subTitle: 'Any thought I think interesting to tell on my personal site'
  }),
  og_image_alt: 'Blog — rizkicitra.dev',
  slug: '/blog',
  type: 'website'
})

const BlogPage: NextPage<BlogPageProps> = ({ allBlogs }) => {
  const search = useSearchBlog(allBlogs)
  const mostViewdBlogs = useMemo(() => allBlogs.slice(0).sort(getMostPopularBlog).slice(0, 2), [allBlogs])

  useEffect(() => {
    if (typeof window === 'undefined' || !isProd) return
    ;(async () => {
      try {
        await axios.get(`https://rizkicitra.dev/api/revalidate?slug=/blog&secret=${SECRET_KEY}`)
      } catch (err) {
        console.info('Could not revalidate')
      }
    })()
  }, [])

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <Searchbar onChange={search.handleChange} value={search.query} />

      {allBlogs.length > 0 && search.query.length === 0 ? (
        <div className={twclsx('flex flex-col', 'gap-24')}>
          <BlogList displayViews posts={mostViewdBlogs} title='Most Viewed' />

          <BlogList displayViews posts={allBlogs} title='All Post' />
        </div>
      ) : null}

      {search.query.length > 0 && (
        <>
          {search.filteredBlog.length > 0 ? (
            <BlogList displayViews posts={search.filteredBlog} title='Search Post' />
          ) : (
            <EmptyResult />
          )}
        </>
      )}
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const response = await getContents<Blog>('/blog')
  if (isDev)
    return {
      props: {
        allBlogs: response.map((r) => ({ ...r.header, est_read: readingTime(r.content).text })).sort(getNewestBlog)
      }
    }

  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL!

  const blogs: Blog[] = []

  const requests = response.map(async (r) => {
    const res = await axios.get<PageViewResponse>(baseURL + '/api/pageviews?slug=' + r.header.slug)
    const est_read = readingTime(r.content).text
    const views = res.data.view ?? 0

    return { ...r.header, views, est_read } as Blog
  })

  const settles = await Promise.allSettled(requests)

  settles.forEach((settle) => {
    if (settle.status === 'fulfilled') {
      blogs.push(settle.value)
    }
  })

  return {
    props: {
      allBlogs: blogs.sort(getNewestBlog)
    }
  }
}

export default BlogPage
