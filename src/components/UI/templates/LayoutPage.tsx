import { CustomSeo, CustomSeoProps } from '@/components/CustomSeo'

import { Footer } from '@/UI/common'

import { twclsx } from '@/libs/twclsx'

type TProps = {
  className?: string
  children: React.ReactNode
  seo: CustomSeoProps
}

export type LayoutPageProps = TProps

export const LayoutPage = ({ children, className, ...props }: TProps) => {
  return (
    <>
      <CustomSeo {...props.seo} />

      <main className={twclsx('layout', className)}>{children}</main>
      <Footer />
    </>
  )
}
