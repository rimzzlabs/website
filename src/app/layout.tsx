import { SkipContent } from '@/components/skip-content'

import { SITE_NAME, SITE_URL } from '@/domains/seo'

import { tw } from '@/utils/tw'

import '@/styles/tailwind.css'

import { Providers } from './providers'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import 'react-tooltip/dist/react-tooltip.css'

const inter = localFont({
  src: './font/inter-var-latin.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  manifest: '/manifest.json',
  themeColor: '#030712',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    startupImage: [
      { url: '/icons/iphone/129.png', media: '(device-width: 564px) and (device-height: 1024px)' },
      { url: '/icons/iphone/180.png', media: '(device-width: 768px) and (device-height: 1024px)' },
    ],
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en-US' className={tw('scroll-pt-20', inter.variable)} suppressHydrationWarning>
      <head />
      <body>
        <SkipContent />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
