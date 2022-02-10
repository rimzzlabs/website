import Link from '@/components/atoms/Link'
import Hero from '@/components/mollecules/Hero'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { NextPage } from 'next'

const GuestBookPage: NextPage = () => {
  const meta = {
    title: 'Guestbook',
    templateTitle: 'Rizki Maulana Citra, Student and Frontend Developer',
    description:
      "You can leave a comment, say something about me, this page, a joke, or even cheer ourselve, and please be nice to other's with what you are typed here 😉"
  }
  return (
    <Layout {...meta}>
      <Hero {...meta}>
        <p className='mt-2 md:mt-4'>
          This guestbook page inspired from{' '}
          <Link
            className='hover:underline decoration-2 decoration-primary-500 dark:decoration-primary-400'
            href='https://leerob.io'
            newTab
          >
            Lee Robinsons&apos;
          </Link>{' '}
          Site.
        </p>
      </Hero>
      <Footer />
    </Layout>
  )
}

export default GuestBookPage
