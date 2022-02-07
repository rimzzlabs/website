import '@/styles/globals.css'
import '@/styles/prism.css'

import Header from '@/components/organism/Header'

import variants, { withExit } from '@/libs/animation/variants'

import { AnimatePresence, LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'

const v: Variants = withExit(variants)

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem>
      <LazyMotion features={domAnimation}>
        <Header />
        <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)} exitBeforeEnter>
          <m.div
            key={router.route.concat('1')}
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
