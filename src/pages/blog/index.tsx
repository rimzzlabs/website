import Hero from '@/components/mollecules/Hero'
import { Loading } from '@/components/mollecules/Loading'
import Searchbar from '@/components/mollecules/Searchbar'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { Blogs } from '@/data/blog/blog.type'
import { getBlog } from '@/helpers/getBlog'
import { getPageViewsEach } from '@/helpers/getPageViewsEach'
import useSearch from '@/hooks/useSearch'
import { isProd } from '@/libs/constants/environmentState'
import { getMetaData } from '@/libs/metaData'
import { generateOgImage } from '@/libs/ogImage'
import { getMostPopularBlog, getNewestBlog } from '@/libs/sortBlog'
import { twclsx } from '@/libs/twclsx'

import { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import readingTime from 'reading-time'

const BlogCard = dynamic(() => import('@/components/mollecules/BlogCard'), { suspense: true })
const Card = dynamic(() => import('@/components/atoms/Card'), { suspense: true })
interface BlogPageProps {
  allBlogs: Array<Blogs>
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

  return (
    <Layout {...(meta as LayoutProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <Searchbar onChange={handleChange} value={query} />

      {allBlogs.length > 0 && query.length === 0 ? (
        <div className={twclsx('flex flex-col', 'gap-24')}>
          <section>
            <h2 className={twclsx('mb-4')}>Most Viewed</h2>
            <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
                {allBlogs
                  .slice(0, 2)
                  .sort(getMostPopularBlog)
                  .map((b) => (
                    <Card key={b.slug}>
                      <BlogCard displayViews {...b} />
                    </Card>
                  ))}
              </div>
            </Suspense>
          </section>

          <section>
            <h2 className={twclsx('mb-4')}>All Post</h2>

            <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
                {allBlogs.map((b) => (
                  <Card key={b.slug}>
                    <BlogCard displayViews {...b} />
                  </Card>
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
            <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1 gap-4', 'flex-auto')}>
                {filteredData.map((b, id) => (
                  <Card key={b.title.slice(0, 7) + id}>
                    <BlogCard displayViews {...b} />
                  </Card>
                ))}
              </div>
            </Suspense>
          ) : (
            <p>No post found, try a lil different now?</p>
          )}
        </section>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const response = await getBlog()

  if (isProd) {
    const allBlogs = (await getPageViewsEach(response)).sort(getNewestBlog)

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
