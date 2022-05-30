import '@/styles/globals.css'

import Skip from '@/components/atoms/Skip'
import Header from '@/components/organism/Header'

import usePageSwitched from '@/hooks/usePageSwitched'
import variants, { withExit } from '@/libs/animation/variants'
import umamiClient from '@/libs/umamiClient'

import { AnimatePresence, LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import 'prism-themes/themes/prism-night-owl.css'
import { useEffect } from 'react'

const v: Variants = withExit(variants)

const App = ({ Component, pageProps, router }: AppProps) => {
  const { amount, updateAmount } = usePageSwitched()

  useEffect(() => {
    const SECRET = process.env.NEXT_PUBLIC_SECRET
    const isProd = process.env.NODE_ENV === 'production'

    // will run only if it's on production andthe amount of switched page is less than or equal 3 times
    if (isProd && amount < 1) {
      updateAmount(amount + 1)
      // if it's on production on some condition fulfilled, run this HTTP request on component unmount
      ;(async () => {
        try {
          await umamiClient.get('/api/revalidate?secret=' + SECRET)
        } catch (error) {
          console.info('revalidate error')
        }
      })()
    }

    // this useEffect will run everytime route change, except URL starts with /blog nor route /404

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route, amount])

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
