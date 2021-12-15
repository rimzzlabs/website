import FullPage from '@/components/FullPage'
import NextImage from '@/components/NextImage'
import NextLink from '@/components/NextLink'
import clsx from 'clsx'
import type { NextPage } from 'next'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <FullPage className='flex items-center p-0'>
        <div className='flex flex-col items-center justify-center w-full'>
          <figure className='relative w-40 md:w-80 aspect-square'>
            <NextImage src={'/svg/owl.svg'} alt='owl illustration' layoutFill />
          </figure>
          <section className='text-center'>
            <h1 className='mb-4 md:mb-8'>Page Not Found</h1>
            <NextLink
              href='/'
              className={clsx(
                'bg-blue-100 dark:bg-dark-700 text-primary-600 dark:text-rose-400 p-2',
                'rounded animated-underline border-b border-dotted border-dark-900 dark:border-dark-200'
              )}>
              Back To Home
            </NextLink>
          </section>
        </div>
      </FullPage>
    </>
  )
}

export default NotFoundPage
