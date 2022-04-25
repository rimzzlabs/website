import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Footer from '@/components/organism/Footer'

import clsx from 'clsx'
import { NextPage } from 'next'

export interface LayoutProps extends CustomSeoProps {
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main className={clsx('mt-36 scroll-mt-36')}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
