import '@/styles/globals.css'
import '@/styles/prism.css'

import Header from '@/components/Header'

import { progress } from '@/libs/progress'
import { metaPages } from '@/utils/constant'

import { AnimatePresence, LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Router from 'next/router'

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const App = ({ Component, pageProps, router }: AppProps) => {
  const v: Variants = {
    hidden: { opacity: 0, y: 50 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { ease: 'easeInOut', duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { ease: 'easeInOut', duration: 0.5 }
    }
  }
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <NextSeo additionalMetaTags={metaPages.additional} />

      <LazyMotion features={domAnimation}>
        <Header />
        <AnimatePresence initial exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
          <m.div
            id='skip-nav'
            key={router.route.concat('1')}
            className='layout'
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={v}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
