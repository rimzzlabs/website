import CustomImage from '@/components/atoms/CustomImage'
import UnderlineLink from '@/components/mollecules/UnderlineLink'
import Layout from '@/components/templates/Layout'

import useMediaQuery from '@/hooks/useMediaQuery'
import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

/**
Used to display an UI of 404, if the
Visitor of the web visit unavailable page,
Try go to http://localhost:3000/unavail
You will see this page being used
*/
const NotFoundPage: NextPage = () => {
  const mdscreen = useMediaQuery('(min-width: 768px)')

  return (
    <Layout
      title='404'
      description='The page you are looking for are not found, please contact Rizki if you encounter any problem'
      template='Page Not Found'
    >
      <div className={twclsx('flex flex-col items-center justify-center', 'gap-4 min-h-screen', '-mt-36')}>
        <CustomImage
          display='intrinsic'
          src='/static/404.webp'
          alt='illustration'
          objectFit='contain'
          quality={60}
          width={mdscreen ? 256 : 144}
          height={mdscreen ? 256 : 144}
        />

        <section className={twclsx('text-center')}>
          <h1 className={twclsx('text-center')}>404 - Not Found</h1>
          <p className={twclsx('my-2 md:my-4')}>The page you are looking for are not found</p>
          <UnderlineLink href='/'>Back to home</UnderlineLink>
        </section>
      </div>
    </Layout>
  )
}

export default NotFoundPage
