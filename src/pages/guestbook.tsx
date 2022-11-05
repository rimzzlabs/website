import { Hero, LayoutPage } from '@/components/UI/templates'
import { Guestbook, GuestbookEditor } from '@/components/guestbook'

import { supabaseClient } from '@/services/supabase'

import { twclsx } from '@/libs'
import { generateOgImage, getMetaPage } from '@/libs/metapage'

import { useGuestbook, useGuestbookUser, useTheme } from '@/hooks'
import { Guestbook as GuestbookType } from '@/hooks/guestbook/model'

import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import colors from 'tailwindcss/colors'

type GuestbookPageProps = {
  guestbook: GuestbookType[]
}

const meta = getMetaPage({
  title: 'Guestbook',
  description: `Leave a trace, let me and other visitors know you were here too, you can write whatever— appreciation, warm message, jokes, or just saying hello.`,
  keywords: [
    'Guestbook',
    'rizkicitra',
    'rizkimcitra',
    'Rizki Citra',
    'R Maulana Citra',
    'Guestbook Rizki',
    'Guestbook message',
    'Rizki Maulana Citra',
    'Rizki Maulana Citra',
    'Guestbook Rizki M Citra',
    'Guestbook Rizki Maulana Citra'
  ],
  og_image: generateOgImage({
    title: 'Guestbook',
    subTitle: 'Leave whatever you want on my website',
    theme: 'dark'
  }),
  og_image_alt: 'Guestbook - rizkicitra.dev',
  slug: '/guestbook',
  type: 'website'
})

const GuestbookPage: NextPage<GuestbookPageProps> = ({ guestbook = [] }) => {
  const { getUser } = useGuestbookUser()
  const { guestbook: guestbookClient, getGuestbook } = useGuestbook()
  const { theme, systemTheme, mounted } = useTheme()

  useEffect(() => {
    ;(async () => {
      await Promise.all([getUser(), getGuestbook()])
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutPage {...meta}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <GuestbookEditor />
      <Guestbook guestbook={guestbookClient.length === 0 ? guestbook : guestbookClient} />

      {mounted && (
        <Toaster
          toastOptions={{
            className: twclsx('border-2 border-toast'),
            style: {
              borderRadius: 0,
              position: 'relative',
              zIndex: 4,
              backgroundColor:
                theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? colors.zinc[800] : colors.white,
              color:
                theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? colors.white : colors.zinc[900]
            }
          }}
        />
      )}
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<GuestbookPageProps> = async () => {
  const res = await supabaseClient.from('guestbook').select('*')

  return {
    props: {
      guestbook:
        (res.data as GuestbookType[] | null)?.sort((a, b) =>
          new Date(a.created_at) < new Date(b.created_at) ? 1 : new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
        ) ?? []
    },
    revalidate: 30
  }
}

export default GuestbookPage
