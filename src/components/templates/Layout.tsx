import Seo, { CustomSeoProps } from '@/components/atoms/Seo'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Footer = dynamic(() => import('@/components/organism/Footer'), { suspense: true })

export type LayoutProps = {
  className?: string
  children: React.ReactNode
} & CustomSeoProps

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main className={twclsx('mt-36 scroll-mt-36')}>{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Layout
