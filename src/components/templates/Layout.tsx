import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Footer from '@/components/organism/Footer'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

export interface LayoutProps extends CustomSeoProps {
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  const { pathname } = useRouter()
  const isError = pathname === '/_error' || pathname === '/_offline' || pathname === '/404'

  return (
    <>
      <Seo {...props} />
      <main className={twclsx('mt-36 scroll-mt-36')}>{children}</main>
      {!isError && <Footer />}
    </>
  )
}

export default Layout
