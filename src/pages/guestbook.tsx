import { Hero, LayoutPage } from '@/components/UI/templates'
import { Guestbook, GuestbookEditor } from '@/components/guestbook'

import { supabaseClient } from '@/services/supabase'

import { generateOgImage, getMetaPage } from '@/libs/metapage'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook as GuestbookType } from '@/hooks/guestbook/model'

import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'

type GuestbookPageProps = {
  guestbook: GuestbookType[]
}

const meta = getMetaPage({
  title: 'Guestbook',
  description: `Sign a guestbook on my website, you can leave whatever you'd like.`,
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
    subTitle: "Leave whatever message you'd like on my website",
    theme: 'dark'
  }),
  og_image_alt: 'Guestbook - rizkicitra.dev',
  slug: '/guestbook',
  type: 'website'
})

const GuestbookPage: NextPage<GuestbookPageProps> = ({ guestbook = [] }) => {
  const { getUser } = useGuestbookUser()
  const { guestbook: guestbookClient, getGuestbook } = useGuestbook()

  useEffect(() => {
    ;(async () => {
      await Promise.all([getUser(), getGuestbook()])
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutPage {...meta}>
      <Hero
        title={meta.title as string}
        description='Hey, leave a little message to let me and other visitors know you were here. You can write whatever you want, maybe some appreciation, a friendly message, a joke, or just a quick hello.'
      />

      <GuestbookEditor />
      <Guestbook guestbook={guestbookClient.length === 0 ? guestbook : guestbookClient} />
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
