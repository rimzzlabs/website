import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Seo from '@/components/atoms/Seo'

import variants from '@/libs/animation/variants'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { NextPage } from 'next'

const v = variants()

/**
Used to display an UI of 404, if the
Visitor of the web visit unavailable page,
Try go to http://localhost:3000/unavail
You will see this page being used
*/
const NotFoundPage: NextPage = () => {
  return (
    <main className={clsx('w-full min-h-screen', 'flex items-center justify-center')}>
      <Seo title='404 Page Not Found' />
      <div>
        <motion.figure
          whileTap={{
            scale: 0.98
          }}
          initial='hidden'
          animate='visible'
          variants={v}
          className='relative mx-auto mb-2 md:mb-4 w-full md:w-1/2 aspect-square'
        >
          <Image src='/static/404.webp' alt='illustration' objectFit='contain' priority />
        </motion.figure>

        <motion.section initial='hidden' animate='visible' variants={v} className='text-center'>
          <h1 className='text-center'>404 Not Found</h1>
          <p className='my-2 md:my-4'>The page you are looking for are not found, consider go back home instead?</p>
          <Link
            href='/'
            className={clsx(
              'accessible',
              'relative py-1 hover:ring-0 ring-primary-500',
              'border-b border-dotted border-theme-500 dark:border-theme-500',
              'after:absolute after:bottom-0 after:left-0',
              'after:w-0 after:h-0.5 after:transition-all',
              'after:bg-gradient-to-r after:from-primary-500 after:to-ternary-500',
              'hover:after:w-full'
            )}
          >
            Go back to home
          </Link>
        </motion.section>
      </div>
    </main>
  )
}

export default NotFoundPage
