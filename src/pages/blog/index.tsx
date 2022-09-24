import { Spinner } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents, getPageViewsEach } from '@/services'

import { isProd } from '@/libs/constants/environmentState'
import { getMetaData } from '@/libs/metaData'
import { generateOgImage } from '@/libs/ogImage'
import { getMostPopularBlog, getNewestBlog } from '@/libs/sortBlog'
import { twclsx } from '@/libs/twclsx'

import { useSearch } from '@/hooks'

import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useMemo } from 'react'
import readingTime from 'reading-time'
import type { Blog } from 'rizkicitra'

const BlogCard = dynamic(() => import('@/UI/cards').then((m) => ({ default: m.BlogCard })), { suspense: true })

type BlogPageProps = {
  allBlogs: Array<Blog>
}

const meta = getMetaData({
  title: 'Blog',
  description: `I write blog once in a while, talks about Web Development related topics and my personal experience, I like to share my thought this way.`,
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
  const { query, handleChange, filteredData } = useSearch<BlogPageProps['allBlogs']>(allBlogs, 'blog')
  const mostViewdBlogs = useMemo(() => allBlogs.slice(0).sort(getMostPopularBlog).slice(0, 2), [allBlogs])

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <Searchbar onChange={handleChange} value={query} />

      {allBlogs.length > 0 && query.length === 0 ? (
        <div className={twclsx('flex flex-col', 'gap-24')}>
          <section>
            <h2 className={twclsx('mb-4')}>Most Viewed</h2>
            <Suspense fallback={<Spinner containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
                {mostViewdBlogs.map((b) => (
                  <BlogCard key={b.slug} displayViews {...b} />
                ))}
              </div>
            </Suspense>
          </section>

          <section>
            <h2 className={twclsx('mb-4')}>All Post</h2>

            <Suspense fallback={<Spinner containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
                {allBlogs.map((b) => (
                  <BlogCard key={b.slug} displayViews {...b} />
                ))}
              </div>
            </Suspense>
          </section>
        </div>
      ) : null}

      {query.length > 0 && (
        <section className={twclsx('content-auto')}>
          <h2 className={twclsx('mb-4')}>Search Post</h2>
          {filteredData.length > 0 ? (
            <Suspense fallback={<Spinner containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1 gap-4', 'flex-auto')}>
                {filteredData.map((b) => (
                  <BlogCard key={b.slug} displayViews {...b} />
                ))}
              </div>
            </Suspense>
          ) : (
            <p>No post found, try a lil different now?</p>
          )}
        </section>
      )}
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const response = await getContents<Blog>('/blog')

  if (isProd) {
    const allBlogs = await getPageViewsEach(response)
    allBlogs.sort(getNewestBlog)

    return {
      props: {
        allBlogs
      }
    }
  }

  const allBlogs = response.map((r) => ({ ...r.header, est_read: readingTime(r.content).text }))
  return {
    props: {
      allBlogs
    }
  }
}

export default BlogPage
