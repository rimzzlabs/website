import Seo, { SeoProp } from '@/components/atoms/Seo'

import clsx from 'clsx'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export interface LayoutProps extends SeoProp {
  title: string
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  const addditionalMetaTag = props.additionalMetaTags ?? []
  const url = 'https://rizkicitra.dev' + useRouter().asPath
  return (
    <>
      <Seo
        {...props}
        openGraph={{
          ...props.openGraph,
          site_name: 'Rizki M Citra',
          url: url,
          type: 'website'
        }}
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: url
          }
        ]}
        additionalMetaTags={[
          ...addditionalMetaTag,
          {
            name: 'publisher',
            content: 'vercel'
          }
        ]}
      />
      <main className={clsx('mt-24 md:mt-36')}>{children}</main>
    </>
  )
}

export default Layout
