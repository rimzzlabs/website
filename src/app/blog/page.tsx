import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { getPosts } from '@/domains/post'
import { OG, SITE_NAME, SITE_OWNER, TWITTER, createMetadata } from '@/domains/seo'

import { MainLayout } from '@/layouts'

import { BlogPosts } from './blog-posts'

export const metadata = createMetadata({
  title: 'Blog',
  templateTitle: SITE_NAME,
  description: `My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics`,
  creator: 'Rizki Maulana Citra',
  canonical: 'blog',
  openGraph: {
    images: OG.static,
    type: 'website',
    title: SITE_OWNER,
    siteName: SITE_NAME,
    description: `Software engineer frontend. I craft fascinating and intuitive user interfaces.`,
  },
  twitter: {
    card: 'summary_large_image',
    description: `Software engineer frontend. I craft fascinating and intuitive user interfaces.`,
    creator: TWITTER.username,
    creatorId: TWITTER.id,
    siteId: TWITTER.id,
    title: SITE_OWNER,
    images: [OG.static],
  },
})

export default async function Page() {
  const posts = await getPosts()
  if (!posts) {
    throw new Error('Cannot fetch blog post', {
      cause: { page: '/blog', reason: 'Failed to fetch' },
    })
  }

  return (
    <>
      <Header />
      <MainLayout className='pt-16'>
        <section className='mb-8'>
          <h1 className='title mb-8'>Blog</h1>
          <p className='mb-2.5'>
            You&apos;ll find me exploring a variety of interesting topics, from my career
            development, programming and technologies to trending topics of interest at the time.
          </p>
          <p>
            All posts on my blog are my own and do not represent any particular organization; feel
            free to reads.
          </p>
        </section>
        <BlogPosts posts={posts} />
      </MainLayout>
      <Footer />
    </>
  )
}
