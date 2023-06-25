import { PatternBanner } from '@/components/pattern-banner'

import { SITE_OWNER, SITE_URL, createMetadata } from '@/domains/seo'

import { HomeExplore, HomeHero, HomeSkills, HomeTimeline } from '@/features/home'
import { MainLayout } from '@/layouts'

export const metadata = createMetadata({
  title: SITE_OWNER,
  description: `Embark on an Unforgettable Voyage through Rizki's Digital Cosmos: Delve into Thought-Provoking Blog Posts, Explore the Marvels of My Personal Portfolio, and Immerse Yourself in an Abundance of Inspirations, Musings, and Creative Adventures, All Within the Enchanting Realm of My Online Haven.`,
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
    images: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp`,
    type: 'profile',
    title: SITE_OWNER,
  },
  creator: SITE_OWNER,
  canonical: SITE_URL,
})

export default async function Page() {
  return (
    <>
      <PatternBanner />
      <MainLayout className='space-y-10 md:space-y-14'>
        <HomeHero />
        <HomeTimeline />
        <HomeSkills />
        <HomeExplore />
      </MainLayout>
    </>
  )
}
