import '@/styles/globals.css'
import Router from 'next/router'
import Header from '@/components/Header'
import { ThemeProvider } from 'next-themes'
import { progress } from '@/libs/progress'
import { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'
import { metaPages } from '@/utils/constant'
import {
  LazyMotion,
  domAnimation,
  AnimatePresence,
  m,
  Variants
} from 'framer-motion'

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
        <AnimatePresence
          initial
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}>
          <m.div
            key={router.route.concat('1')}
            className='layout'
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={v}>
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
