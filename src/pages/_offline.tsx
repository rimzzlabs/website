import CustomImage from '@/components/atoms/CustomImage'
import Layout from '@/components/templates/Layout'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

const meta = {
  title: '💀 You Are Offline',
  description: 'You are currently offline. Please check your internet connection and try again later.'
}

const OfflinePage: NextPage = () => {
  return (
    <Layout {...meta}>
      <div className={twclsx('flex flex-col items-center justify-center', 'min-h-screen', '-mt-36')}>
        <section className={twclsx('flex flex-col items-center', 'gap-4', 'text-center')}>
          <CustomImage
            display='intrinsic'
            src='/static/404.webp'
            alt='illustration'
            objectFit='contain'
            quality={60}
            width={256}
            height={256}
          />
          <h1 className={twclsx('mb-4')}>{meta.title}</h1>
          <p className={twclsx('max-w-lg', 'md:text-lg')}>{meta.description}</p>
        </section>
      </div>
    </Layout>
  )
}

export default OfflinePage
