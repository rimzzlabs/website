import { BlogCard } from '@/UI/cards'
import { EmptyResult, Spinner } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents, getPageViewsEach } from '@/services'
import { umamiClient } from '@/services/umami'

import { isProd } from '@/libs/constants/environmentState'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getMostPopularBlog, getNewestBlog } from '@/libs/sorters'
import { twclsx } from '@/libs/twclsx'

import { useSearch } from '@/hooks'

import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import readingTime from 'reading-time'
import type { Blog } from 'rizkicitra'

type BlogPageProps = {
  allBlogs: Array<Blog>
}

const meta = getMetaPage({
  title: 'Blog',
  description: `I write blog once a while, talks about Web Development related topics and my personal experience, sometime it's fun to share with others even tho we're just folks.`,
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
  const search = useSearch<BlogPageProps['allBlogs']>(allBlogs, 'blog')
  const mostViewdBlogs = useMemo(() => allBlogs.slice(0).sort(getMostPopularBlog).slice(0, 2), [allBlogs])

  useEffect(() => {
    if (isProd) {
      const SECRET = process.env.NEXT_PUBLIC_SECRET
      ;(async () => {
        try {
          await umamiClient.get('/api/revalidate?secret=' + SECRET)
        } catch (error) {
          console.info('revalidate error')
        }
      })()
    }
  }, [])

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <Searchbar onChange={search.handleChange} value={search.query} />

      {allBlogs.length > 0 && search.query.length === 0 ? (
        <div className={twclsx('flex flex-col', 'gap-24')}>
          <section>
            <h2 className={twclsx('mb-4')}>Most Viewed</h2>

            <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
              {mostViewdBlogs.map((b) => (
                <BlogCard key={b.slug} displayViews {...b} />
              ))}
            </div>
          </section>

          <section>
            <h2 className={twclsx('mb-4')}>All Post</h2>
            <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
              {allBlogs.map((b) => (
                <BlogCard key={b.slug} displayViews {...b} />
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {search.query.length > 0 && (
        <section className={twclsx('content-auto')}>
          <h2 className={twclsx('mb-4')}>Search Post</h2>
          {search.filteredData.length > 0 ? (
            <div className={twclsx('grid-cols-1 gap-4', 'flex-auto', !search.isPending && 'grid')}>
              {search.isPending ? (
                <Spinner containerSize='full' spinnerSize='md' containerStyle='h-40' />
              ) : (
                search.filteredData.map((b) => <BlogCard key={b.slug} displayViews {...b} />)
              )}
            </div>
          ) : (
            <EmptyResult />
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
