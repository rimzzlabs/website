import '@/styles/globals.css'

import Skip from '@/components/atoms/Skip'
import Header from '@/components/organism/Header'

import variants, { withExit } from '@/libs/animation/variants'
import { isProd } from '@/libs/constants/environmentState'
import umamiClient from '@/libs/umamiClient'

import { AnimatePresence, LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import 'prism-themes/themes/prism-night-owl.css'
import { useEffect } from 'react'
import 'react-image-lightbox/style.css'

const v: Variants = withExit(variants)

const App = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    if (isProd) {
      const SECRET = process.env.NEXT_PUBLIC_SECRET
      ;(async () => {
        try {
          await umamiClient.get('/api/revalidate?secret=' + SECRET)
        } catch (error) {
          console.info('revalidate error')
        }
      })()
    }
  }, [])

  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem>
      <LazyMotion features={domAnimation}>
        <Skip />
        <Header />
        <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)} exitBeforeEnter>
          <m.div
            id='skip-content'
            key={router.route.concat(router.pathname)}
            variants={v}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='layout'
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
