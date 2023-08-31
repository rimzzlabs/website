import { CloudinaryImg } from '@/components/cloudinary-image'
import { PostList } from '@/components/post/post-list'

import { compose } from '@/utils/common'
import { createMetadata } from '@/utils/create-metadata'
import {
  SITE_OWNER,
  SITE_OWNER_ROLE,
  SITE_URL,
  TWITTER_ID,
  TWITTER_USERNAME,
} from '@/utils/env/client'
import { filterPublishedPosts, sliceFirstThreePosts, sortLatestPosts } from '@/utils/post'

import { KEYWORDS, OG } from '@/constants/seo'
import { MainLayout } from '@/layouts'

import { allPosts } from 'contentlayer/generated'

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
    creator: TWITTER_USERNAME,
    creatorId: TWITTER_ID,
    siteId: TWITTER_ID,
    title: SITE_OWNER,
    images: [OG.static],
  },
})

export default function Page() {
  const posts = compose(filterPublishedPosts, sortLatestPosts, sliceFirstThreePosts)(allPosts)

  return (
    <MainLayout className='space-y-10 md:space-y-14'>
      <section className='flex flex-col my-4'>
        <div className='flex flex-col-reverse sm:flex-row sm:items-end mb-10'>
          <h1 className='mt-1 sm:mt-0 sm:text-4xl md:text-5xl'>
            Hi, I&apos;m
            <br />
            {SITE_OWNER}
          </h1>

          <div className='relative aspect-[.75/1] w-28 sm:w-32 mb-4 sm:mb-unset sm:ml-auto'>
            <CloudinaryImg
              fill
              priority
              quality={80}
              alt='Rizki Maulana Citra'
              title='Rizki Maulana Citra'
              className='rounded-md dark:brightness-95'
              sizes='(min-width: 10px) 112px, (min-width: 640px) 128px'
              publicId='rizkicitra.dev/rizkimcitra.webp'
            />
          </div>
        </div>

        <div className='prose'>
          <p>
            I&apos;m a software engineer frontend based in Indonesia. A passionate software engineer
            driven to craft intuitive and smooth user experiences on the web.
          </p>
          <p>
            I continually explore new technologies and tools to improve my development process,
            while keeping up with the latest trends and best practices.
          </p>
        </div>
      </section>

      <PostList className='mt-4' posts={posts} title='Latest Post' />
    </MainLayout>
  )
}
