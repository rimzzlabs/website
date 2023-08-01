import { CloudinaryImg } from '@/components/cloudinary-image'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LatestPostList, LatestPostListLoading } from '@/components/post'

import {
  KEYWORDS,
  OG,
  SITE_OWNER,
  SITE_OWNER_ROLE,
  SITE_URL,
  TWITTER,
  createMetadata,
} from '@/domains/seo'

import { MainLayout } from '@/layouts'

import { Suspense } from 'react'

export const metadata = createMetadata({
  title: SITE_OWNER,
  templateTitle: SITE_OWNER_ROLE,
  description: `Hey, I am Rizki Maulana Citra. I am a software engineer frontend. I craft fascinating and intuitive user interfaces.`,
  keywords: KEYWORDS.home,
  canonical: '',
  openGraph: {
    images: OG.static,
    url: SITE_URL,
    title: SITE_OWNER,
    type: 'profile',
    siteName: 'rizkicitra.dev',
    description: `Software engineer frontend. I craft fascinating and intuitive user interfaces.`,
  },
  twitter: {
    card: 'summary_large_image',
    description: 'Software engineer frontend. I craft fascinating and intuitive user interfaces.',
    site: SITE_URL,
    creator: TWITTER.username,
    creatorId: TWITTER.id,
    siteId: TWITTER.id,
    title: SITE_OWNER,
    images: [OG.static],
  },
})

export default async function Page() {
  return (
    <>
      <Header />
      <MainLayout className='space-y-10 md:space-y-14'>
        <section className='flex flex-col my-4'>
          <div className='flex flex-col-reverse sm:flex-row md:items-end mb-10'>
            <h1 className='mt-1 md:text-5xl'>
              Hi, I&apos;m
              <br />
              {SITE_OWNER}
            </h1>

            <div className='relative aspect-[.75/1] w-28 sm:w-32 mb-4 md:mb-unset md:ml-auto'>
              <CloudinaryImg
                fill
                sizes='(min-width: 10px) 112px, (min-width: 640px) 128px'
                priority
                quality={80}
                className='rounded-md dark:brightness-95'
                alt='Rizki Maulana Citra'
                title='Rizki Maulana Citra'
                publicId='rizkicitra.dev/rizkimcitra.webp'
              />
            </div>
          </div>

          <div className='prose'>
            <p>
              I&apos;m a software engineer frontend based in Indonesia. A passionate software
              engineer driven to craft intuitive and smooth user experiences on the web.
            </p>
            <p>
              I continually explore new technologies and tools to improve my development process,
              while keeping up with the latest trends and best practices.
            </p>
          </div>
        </section>

        <Suspense fallback={<LatestPostListLoading />}>
          <LatestPostList />
        </Suspense>
      </MainLayout>
      <Footer />
    </>
  )
}
