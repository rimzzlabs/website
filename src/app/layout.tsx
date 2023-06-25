import { Footer } from '@/components/footer'
import { SkipContent } from '@/components/skip-content'

import { tw } from '@/utils/tw'

import '@/styles/tailwind.css'

import { Providers } from './providers'

import localFont from 'next/font/local'
import 'react-tooltip/dist/react-tooltip.css'

const inter = localFont({
  src: './font/inter-var-latin.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={tw('scroll-pt-16', inter.variable)} suppressHydrationWarning>
      <head />
      <body>
        <SkipContent />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
