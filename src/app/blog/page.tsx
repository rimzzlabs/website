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
          <p>
            You&apos;ll find me amusing on a variety of topics. From a simple blog about myself
            learning technologies and growing in my career, to a specific post I&apos;m interested
            in at the time; feel free to reads!.
          </p>
        </section>

        <BlogPosts posts={posts} />
      </MainLayout>
      <Footer />
    </>
  )
}
