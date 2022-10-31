import { CustomImage } from '@/components/UI/images'
import { LayoutPage } from '@/components/UI/templates'

import { twclsx } from '@/libs'

import { useMediaQuery } from '@/hooks'

import { NextPage } from 'next'

const meta = {
  title: 'You Are Offline',
  description: `It looks like you are offline, please connect to your internet connection and try refreshing this page.`
}

const OfflinePage: NextPage = () => {
  const mdscreen = useMediaQuery('(min-width: 768px)')

  return (
    <LayoutPage {...meta}>
      <div className={twclsx('flex flex-col items-center justify-center', 'gap-4 min-h-screen', '-mt-36')}>
        <CustomImage
          display='intrinsic'
          src='/static/404.svg'
          alt='illustration'
          objectFit='contain'
          quality={60}
          width={mdscreen ? 256 : 144}
          height={mdscreen ? 256 : 144}
        />

        <section className={twclsx('text-center')}>
          <h1 className={twclsx('text-center')}>503 - Offline</h1>
          <p className={twclsx('my-2 md:my-4 max-w-prose')}>{meta.description}</p>
        </section>
      </div>
    </LayoutPage>
  )
}

export default OfflinePage
