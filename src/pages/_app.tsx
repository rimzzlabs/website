import { SkipToContent } from '@/UI/buttons'
import { Header } from '@/UI/common'

import variants, { withExit } from '@/libs/animation/variants'
import { isProd } from '@/libs/constants/environmentState'
import umamiClient from '@/libs/umamiClient'

import '@/styles/globals.css'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import 'prism-themes/themes/prism-night-owl.css'
import { useCallback, useEffect } from 'react'
import 'react-image-lightbox/style.css'

const v: Variants = withExit(variants)

const App = ({ Component, pageProps, router }: AppProps) => {
  const onExitComplete = useCallback(() => window.scrollTo(0, 0), [])
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
        <SkipToContent />
        <Header />
        <AnimatePresence initial={false} onExitComplete={onExitComplete} exitBeforeEnter>
          <m.div
            id='skip-content'
            key={router.route.concat(router.pathname)}
            variants={v}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={router.pathname !== '/resume' ? 'layout' : 'max-w-3xl w-11/12 mx-auto'}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
