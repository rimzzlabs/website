import { CustomSeo, CustomSeoProps } from '@/components/CustomSeo'

import { Footer } from '@/UI/common'

import { twclsx } from '@/libs/twclsx'
import { NextPage } from 'next'

type TProps = {
  className?: string
  children: React.ReactNode
}

export type LayoutPageProps = CustomSeoProps & TProps

export const LayoutPage: NextPage<LayoutPageProps> = ({ children, className, ...props }) => {
  return (
    <>
      <CustomSeo {...props} />

      <main className={twclsx('layout', className)}>{children}</main>
      <Footer />
    </>
  )
}
