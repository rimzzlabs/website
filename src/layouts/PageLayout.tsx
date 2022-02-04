import Seo from '@/components/atoms/Seo'

import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeoProps } from 'next-seo'

interface PageLayoutProps extends NextSeoProps {
  title: string
  className?: string
}

const PageLayout: NextPage<PageLayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main className={clsx(props.className)}>{children}</main>
    </>
  )
}

export default PageLayout
