import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion'
import { pageTransition } from '@/libs/animation'
import { ThemeProvider } from 'next-themes'
import { progress } from '@/libs/progress'
import { AppProps } from 'next/app'
import Router from 'next/router'
import '@/styles/globals.css'
import { NextSeo } from 'next-seo'
import Header from '@/components/Header'

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const App = ({ Component, pageProps, router }: AppProps) => {
  const additionMetaTags = [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'white'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Rizki Maulana Citra'
    },
    {
      name: 'application-name',
      content: 'Rizki Maulana Citra'
    }
  ]
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <NextSeo additionalMetaTags={additionMetaTags} />
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
            variants={pageTransition}>
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
