import { WrappedImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'
import { LayoutPage } from '@/UI/templates'

import type { NextPage } from 'next'

/**
 * Used to display UI of 404, if the
 * Visitor of the web visit unavailable page,
 * Try go to http://localhost:3000/unavail
 * You will see this page being used
 */
const NotFoundPage: NextPage = () => {
  return (
    <LayoutPage
      title='404'
      description='The page you are looking for are not found, please contact Rizki if you encounter any problem'
      template='Page Not Found'
    >
      <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
        <WrappedImage priority src='/static/404.svg' alt='illustration' quality={60} width={225} height={225} />

        <section className='text-center'>
          <h1 className='text-center'>404 - Not Found</h1>
          <p className='my-2 md:my-4'>The page you are looking for are not found</p>

          <UnderlineLink href='/'>Back to home</UnderlineLink>
        </section>
      </div>
    </LayoutPage>
  )
}

export default NotFoundPage
