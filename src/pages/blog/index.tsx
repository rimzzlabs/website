import Card from '@/components/atoms/Card'
import BlogCard from '@/components/mollecules/BlogCard'
import Hero from '@/components/mollecules/Hero'
import Searchbar from '@/components/mollecules/Searchbar'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { Blogs } from '@/data/blog/blog.type'
import { getBlog } from '@/helpers/getBlog'
import useSesarch from '@/hooks/useSearch'
import { getMetaData } from '@/libs/metaData'
import { getNewestBlog } from '@/libs/sortBlog'

import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import readingTime from 'reading-time'

interface BlogPageProps {
  allBlogs: Array<Blogs>
}

const meta = getMetaData({
  title: 'Blog',
  description: `I write blog once in a while, talks about React, CSS and Web Development related topics, I like to share my knowledge and experience throught writing blog.`,
  keywords: ['Rizki Maulana Citra', 'Rizki M Citra', 'Rizkicitra', 'Rizki Citra', 'rizkicitra.dev'],
  og_image:
    'https://og-image.vercel.app/**Blog%20%E2%80%94%20Rizki%20M%20Citra**%3Cbr%20%2F%3ETalks%20about%20Frontend%20Development%20Related%20Topics.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg',
  og_image_alt: 'Blog — Rizki M Citra',
  slug: '/blog',
  type: 'website'
})

const BlogPage: NextPage<BlogPageProps> = ({ allBlogs }) => {
  const { query, handleChange, filteredData } = useSesarch<BlogPageProps['allBlogs']>(allBlogs, 'blog')

  return (
    <Layout {...(meta as LayoutProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <Searchbar onChange={handleChange} value={query} />

      {allBlogs.length > 0 && query.length === 0 ? (
        <div className='flex flex-col gap-24'>
          <section>
            <h2 className='mb-4'>Featured Post</h2>
            <div className={clsx('grid grid-cols-1 md:grid-cols-2 gap-4', 'flex-auto')}>
              {allBlogs
                .filter((b) => b.featured)
                .map((b) => (
                  <Card key={b.title.slice(0, 7)}>
                    <BlogCard {...b} />
                  </Card>
                ))}
            </div>
          </section>

          <section>
            <h2 className='mb-4'>All Post</h2>
            <div className={clsx('grid grid-cols-1 gap-4', 'flex-auto')}>
              {allBlogs.map((b, id) => (
                <Card key={b.title.slice(0, 7) + id}>
                  <BlogCard {...b} />
                </Card>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {query.length > 0 && (
        <section>
          <h2 className='mb-4'>Search Post</h2>
          {filteredData.length > 0 ? (
            <div className={clsx('grid grid-cols-1 gap-4', 'flex-auto')}>
              {filteredData.map((b, id) => (
                <Card key={b.title.slice(0, 7) + id}>
                  <BlogCard {...b} />
                </Card>
              ))}
            </div>
          ) : (
            <p>No post found, try a lil different?</p>
          )}
        </section>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const allBlogs = await getBlog()

  const blogs = allBlogs.map((nb) => ({ est_read: readingTime(nb.content).text, ...nb.header })).sort(getNewestBlog)

  return {
    props: {
      allBlogs: blogs
    }
  }
}

export default BlogPage
