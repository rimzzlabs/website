import { BlogList } from '@/components/content'

import { EmptyResult } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents } from '@/services'

import { SECRET_KEY, isDev, isProd } from '@/libs/constants/environmentState'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getMostPopularBlog, getNewestBlog } from '@/libs/sorters'
import { twclsx } from '@/libs/twclsx'

import { useSearchBlog } from '@/hooks'

import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import readingTime from 'reading-time'
import type { Blog, PageViewResponse } from 'rizkicitra'

type BlogPageProps = {
  allBlogs: Array<Blog>
}

const meta = getMetaPage({
  title: 'Blog',
  description: `You'll find a collection of my thoughts and musings on a variety of topics. I write about everything from current events to personal experiences, and I always strive to share my honest opinions. Keep in mind that my views are my own and do not necessarily reflect those of any other person or organization.`,
  keywords: ['Rizki Maulana Citra', 'Rizki M Citra', 'Rizkicitra', 'Rizki Citra', 'rizkicitra.dev'],
  og_image: generateOgImage({
    title: 'Blog - rizkicitra.dev',
    subTitle: 'Any thought I think interesting to share on my personal site'
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
          <BlogList
            displayViews
            posts={mostViewdBlogs}
            title='Most Viewed'
            description='Hey, I thought you might be interested in checking out my most-viewed post. Feel free to give it a read.'
          />

          <BlogList
            posts={allBlogs}
            displayViews
            title='All Post'
            description="t looks like you're interested in my posts. You're welcome to take a look and read them, and they're sorted by date so you can easily find the newest ones."
          />
        </div>
      ) : null}

      {search.query.length > 0 && (
        <>
          {search.filteredBlog.length > 0 ? (
            <BlogList
              description="I've found some possible results for your search."
              displayViews
              posts={search.filteredBlog}
              title='Search Post'
            />
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

  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rizkicitra.dev'

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
