import { CloudinaryImg } from '@/components/cloudinary-image'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PostCard } from '@/components/post'

import { getLatestPosts } from '@/domains/post/utils/get-latest-posts'
import {
  KEYWORDS,
  SITE_OWNER,
  SITE_OWNER_ROLE,
  SITE_URL,
  TWITTER,
  createMetadata,
} from '@/domains/seo'

import { MainLayout } from '@/layouts'

import buildUrl from 'cloudinary-build-url'

const ogImageURL = buildUrl('rizkicitra.dev/og/og.jpg', { cloud: { cloudName: 'rizkicitra' } })

export const metadata = createMetadata({
  title: SITE_OWNER,
  templateTitle: SITE_OWNER_ROLE,
  description: `Hey, I am Rizki Maulana Citra. I am a software engineer frontend. I craft fascinating and intuitive user interfaces.`,
  keywords: KEYWORDS.home,
  openGraph: {
    images: ogImageURL,
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
        <section className='flex flex-col my-4'>
          <div className='flex flex-col-reverse sm:flex-row md:items-end mb-10'>
            <div className='w-full'>
              <span className='text-xl font-bold text-typo-head dark:text-typo-h-dark'>
                Hello, I&apos;m
              </span>

              <h1 className='mt-1 md:text-5xl'>{SITE_OWNER}</h1>
            </div>

            <div className='relative aspect-[.75/1] w-28 sm:w-32 mb-4 md:mb-unset md:ml-auto'>
              <CloudinaryImg
                fill
                sizes='(max-width: 640px) 112px, (min-width: 640px) 128px'
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
              I&apos;m a software engineer frontend. A passionate engineer driven to craft an
              intuitive and smooth user experiences on the web.
            </p>
            <p>
              I continually explore new technologies and tools to improve my development process,
              and I keep up with the most latest enterprise trends and best practices. And by
              combining those I can build remarkable user experiences on the web.
            </p>
          </div>
        </section>

        <section className='my-4'>
          <h2 className='mb-2'>Latest Posts</h2>
          <p className='mb-8'>Here are my latest three posts you might be interested in reading.</p>

          <div className='flex flex-col divide-y-2 divide-base-200 dark:divide-base-900'>
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      </MainLayout>
      <Footer />
    </>
  )
}
