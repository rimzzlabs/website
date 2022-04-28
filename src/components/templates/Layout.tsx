import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Footer from '@/components/organism/Footer'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

export interface LayoutProps extends CustomSeoProps {
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main className={twclsx('mt-36 scroll-mt-36')}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
