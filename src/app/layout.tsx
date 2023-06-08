import { PatternBanner } from '@/components/pattern-banner'

import '@/styles/tailwind.css'

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
    <html lang='en' className={inter.variable} suppressHydrationWarning>
      <head />
      <body>
        <PatternBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
