import '@/styles/globals.css'

import Skip from '@/components/atoms/Skip'
import Header from '@/components/organism/Header'

import variants, { withExit } from '@/libs/animation/variants'
import umamiClient from '@/libs/umamiClient'

import { AnimatePresence, LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

const v: Variants = withExit(variants)

const App = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    const SECRET = process.env.NEXT_PUBLIC_SECRET
    const isProd = process.env.NODE_ENV === 'production'

    return () => {
      ;(async () => {
        // if it's on production on some condition fulfilled, run this HTTP request on component unmount
        if (isProd) await umamiClient.get('/api/revalidate?secret=' + SECRET)
      })()
    }
    // this useeffect will run everytime route change, except URL starts with /blog nor route /404
  }, [router.route])

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
