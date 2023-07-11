import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { getPosts } from '@/domains/post'
import { SITE_NAME, SITE_OWNER, SITE_URL, TWITTER, createMetadata } from '@/domains/seo'

import { BlogHero, BlogPosts } from '@/features/blog'
import { MainLayout } from '@/layouts'

import buildUrl from 'cloudinary-build-url'

const ogImageURL = buildUrl('rizkicitra.dev/og/blog.jpg', {
  cloud: {
    cloudName: 'rizkicitra',
  },
})

export const metadata = createMetadata({
  title: 'Blog',
  templateTitle: SITE_NAME,
  description: `My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics`,
  creator: 'Rizki Maulana Citra',
  canonical: SITE_URL + '/blog',
  openGraph: {
    images: ogImageURL,
    type: 'website',
    title: SITE_OWNER,
    description: `My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics`,
  },
  twitter: {
    card: 'summary_large_image',
    creator: TWITTER.username,
    creatorId: TWITTER.id,
    siteId: TWITTER.id,
    description:
      'My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics',
    title: `Blog — ${SITE_NAME}`,
    site: 'https://rizkicitra.dev/blog',
    images: [ogImageURL],
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
        <BlogHero />
        <BlogPosts posts={posts} />
      </MainLayout>
      <Footer />
    </>
  )
}
