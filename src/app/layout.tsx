import { Footer } from '@/components/footer'
import { SkipContent } from '@/components/skip-content'

import '@/styles/tailwind.css'

import { tw } from '@/utils/tw'

import { Providers } from './providers'

import localFont from 'next/font/local'

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
