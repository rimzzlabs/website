import { Scroll } from '@/components/scroll'
import { SkipContent } from '@/components/skip-content'

import { SITE_NAME, SITE_URL } from '@/domains/seo'

import { tw } from '@/utils/tw'

import '@/styles/tailwind.css'

import { Providers } from './providers'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import 'react-tooltip/dist/react-tooltip.css'

const UmamiScript = dynamic(
  () => import('@/components/umami-script').then((m) => ({ default: m.UmamiScript })),
  { ssr: false },
)

const inter = localFont({
  src: './font/inter-var-latin.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
export const metadata: Metadata = {
  applicationName: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  themeColor: '#030712',
  viewport: {
    minimumScale: 1,
    initialScale: 1,
    width: 'device-width',
    viewportFit: 'cover',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
    'max-snippet': -1,
    'max-video-preview': -1,
    'max-image-preview': 'large',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={tw('scroll-pt-20', inter.variable)} suppressHydrationWarning>
      <head />
      <body>
        <SkipContent />
        <Providers>{children}</Providers>
        <Scroll />
        <UmamiScript />
      </body>
    </html>
  )
}
