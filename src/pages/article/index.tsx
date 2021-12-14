import Footer from '@/components/Footer'
import FullPage from '@/components/FullPage'
import NextLink from '@/components/NextLink'
import PageMeta from '@/components/PageMeta'
import { metaPages } from '@/utils/constant'
import clsx from 'clsx'

const IndexBlogPage = () => {
  return (
    <>
      <PageMeta {...metaPages.article} />
      <FullPage className='flex items-center justify-center'>
        <section>
          <p className='text-5xl md:text-7xl 2xl:text-9xl mb-2 md:mb-4 text-center'>
            👀
          </p>
          <h1 className='text-center mb-2 md:mb-4'>Coming Soon</h1>
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
