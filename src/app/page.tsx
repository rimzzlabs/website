import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { getLatestPosts } from '@/domains/post/utils/get-latest-posts'
import { SITE_OWNER, SITE_OWNER_ROLE, SITE_URL, TWITTER, createMetadata } from '@/domains/seo'

import { HomeHero, HomePosts } from '@/features/home'
import { MainLayout } from '@/layouts'

import buildUrl from 'cloudinary-build-url'

const ogImageURL = buildUrl('rizkicitra.dev/og/home.jpg', { cloud: { cloudName: 'rizkicitra' } })

export const metadata = createMetadata({
  title: SITE_OWNER,
  templateTitle: SITE_OWNER_ROLE,
  description: `Embark on an Unforgettable Voyage through Rizki's Digital Cosmos: Delve into Thought-Provoking Blog Posts, Explore the Marvels of My Personal Portfolio, and Immerse Yourself in an Abundance of Inspirations, Musings, and Creative Adventures, All Within the Enchanting Realm of My Online Haven.`,
  creator: SITE_OWNER,
  canonical: SITE_URL,
  keywords: [
    SITE_OWNER,
    'Rizki M Citra',
    'Rizkicitra',
    'Rizki Citra',
    'rizkicitra.dev',
    'Rizki Maulana',
    'Rizki Maulana Citra',
  ],
  openGraph: {
    images: ogImageURL,
    type: 'profile',
    title: SITE_OWNER,
    siteName: 'rizkicitra.dev',
    url: 'https://rizkicitra.dev',
    description: `My personal website`,
  },
  twitter: {
    card: 'summary_large_image',
    creator: TWITTER.username,
    creatorId: TWITTER.id,
    siteId: TWITTER.id,
    description: 'Software Engineer Frontend',
    title: `${SITE_OWNER} — ${SITE_OWNER_ROLE}`,
    site: 'https://rizkicitra.dev',
    images: [ogImageURL],
  },
})

export default async function Page() {
  const posts = await getLatestPosts()

  if (!posts) throw new Error('Cannot get post list')

  return (
    <>
      <Header />
      <MainLayout className='space-y-10 md:space-y-14'>
        <HomeHero />
        <HomePosts posts={posts} />
      </MainLayout>
      <Footer />
    </>
  )
}
