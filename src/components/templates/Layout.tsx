import Seo, { SeoProp } from '@/components/atoms/Seo'

import clsx from 'clsx'
import { NextPage } from 'next'

interface LayoutProps extends SeoProp {
  title: string
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main className={clsx('mt-24 md:mt-36')}>{children}</main>
    </>
  )
}

export default Layout
