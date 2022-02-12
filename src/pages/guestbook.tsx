import Link from '@/components/atoms/Link'
import Hero from '@/components/mollecules/Hero'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import clsx from 'clsx'
import { NextPage } from 'next'

const GuestBookPage: NextPage = () => {
  const meta = {
    title: 'Guestbook',
    templateTitle: 'Rizki Maulana Citra, Student and Frontend Developer',
    description:
      "You can leave a comment, say something about me, a joke, or even cheer ourselve, and please be nice to other's with what you are typed here 😉"
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
      <section className='pt-10 md:pt-20'>
        <h2>Sign The Guestbook</h2>
        <p className='my-2 md:my-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum, ipsum voluptate eligendi tenetur quae
          est quas soluta dolores consequuntur! Obcaecati, accusantium ea!
        </p>
        <Link
          newTab
          href='/api/auth/github'
          className={clsx(
            'inline-flex items-center justify-center',
            'py-1 md:py-1.5 px-8 rounded',
            'bg-primary-500 dark:bg-primary-400'
          )}
        >
          Sign
        </Link>
      </section>
      <Footer />
    </Layout>
  )
}

export default GuestBookPage
