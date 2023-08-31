import { DeleteDialog } from '@/components/dialog/delete-dialog'
import { GuestbookList, GuestbookForm } from '@/components/guestbook'
import { Skeleton } from '@/components/skeleton'

import { createMetadata } from '@/utils/create-metadata'
import { SITE_NAME, SITE_OWNER, TWITTER_ID, TWITTER_USERNAME } from '@/utils/env/client'

import { getGuestbook } from '@/api/guestbook/utils'
import { OG } from '@/constants/seo'
import { MainLayout } from '@/layouts'

import { Suspense } from 'react'

export const metadata = createMetadata({
  title: 'Guestbook',
  templateTitle: SITE_NAME,
  description:
    "Welcome to the guestbook! I hope you're doing well. Why not leave some messages here? Either it's a quick hello, a warm message, or a joke. Surprise me.",
  canonical: 'guestbook',
  openGraph: {
    images: OG.static,
    type: 'website',
    title: SITE_OWNER,
    siteName: SITE_NAME,
    description: `Software engineer frontend. I craft smooth and intuitive user interfaces.`,
  },
  twitter: {
    card: 'summary_large_image',
    description: `Software engineer frontend. I craft smooth and intuitive user interfaces.`,
    creator: TWITTER_USERNAME,
    creatorId: TWITTER_ID,
    siteId: TWITTER_ID,
    title: SITE_OWNER,
    images: OG.static,
  },
})

export default async function GuestbookPage() {
  const [guestbook] = await getGuestbook()

  return (
    <MainLayout className='pt-16'>
      <section className='mb-8'>
        <h1 className='title mb-8'>Guestbook</h1>
        <p className='mb-2.5'>
          Welcome to the <strong>guestbook</strong>! I hope you&apos;re doing well. Why not leave
          some messages here? Either it&apos;s a quick hello, a warm message, or a joke. Drop a
          line, surprise me.
        </p>
      </section>

      <GuestbookForm />

      <Suspense
        fallback={
          <div className='space-y-4'>
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-20 w-full' />
          </div>
        }
      >
        <GuestbookList guestbook={guestbook ?? []} />
      </Suspense>

      <DeleteDialog />
    </MainLayout>
  )
}
