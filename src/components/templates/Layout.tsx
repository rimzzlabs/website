import Seo from '@/components/atoms/Seo'

import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeoProps } from 'next-seo'

interface LayoutProps extends NextSeoProps {
  title: string
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main id='skip' className={clsx('mt-24 md:mt-36')}>
        {children}
      </main>
    </>
  )
}

export default Layout
