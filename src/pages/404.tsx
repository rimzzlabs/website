import { WrappedImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'
import { LayoutPage } from '@/UI/templates'

import { useMediaQuery } from '@/hooks'

import type { NextPage } from 'next'

/**
 * Used to display UI of 404, if the
 * Visitor of the web visit unavailable page,
 * Try go to http://localhost:3000/unavail
 * You will see this page being used
 */
const NotFoundPage: NextPage = () => {
  const mdscreen = useMediaQuery('(min-width: 768px)')

  return (
    <LayoutPage
      title='404'
      description='The page you are looking for are not found, please contact Rizki if you encounter any problem'
      template='Page Not Found'
    >
      <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
        <WrappedImage
          priority
          loading='eager'
          src='/static/404.svg'
          alt='illustration'
          quality={60}
          width={mdscreen ? 256 : 144}
          height={mdscreen ? 256 : 144}
        />

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
