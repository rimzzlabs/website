import clsx from 'clsx'
import Footer from '@/components/Footer'
import Meta from '@/components/atoms/Meta'
import NextLink from '@/components/NextLink'
import FullPage from '@/components/wrapper/FullPage'
import { metaPages } from '@/utils/constant'

const IndexBlogPage = () => {
  return (
    <>
      <Meta {...metaPages.article} />
      <FullPage className='flex items-center justify-center'>
        <section>
          <p className='text-5xl md:text-7xl 2xl:text-9xl mb-2 md:mb-4 text-center'>
            👀
          </p>
          <h1 className='header-color text-center mb-2 md:mb-4'>Coming Soon</h1>
          <div className='flex items-center justify-center w-full'>
            <NextLink
              href='/'
              className={clsx(
                'bg-blue-100 dark:bg-dark-700 text-primary-600 dark:text-rose-400 p-2 md:p-3',
                'rounded animated-underline border-b border-dotted border-dark-900 dark:border-dark-200'
              )}>
              Back to Home
            </NextLink>
          </div>
        </section>
      </FullPage>
      <Footer />
    </>
  )
}

export default IndexBlogPage
