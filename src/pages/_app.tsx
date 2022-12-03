import { Header } from '@/components/UI/common/Header'

import { SkipToContent } from '@/UI/buttons'

import variants, { withExit } from '@/libs/animation/variants'

import '@/styles/globals.css'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
// import 'prism-themes/themes/prism-night-owl.css'
// import 'prism-themes/themes/prism-a11y-dark.css'
import 'prism-themes/themes/prism-dracula.css'
import 'react-image-lightbox/style.css'

const v: Variants = withExit(variants)

const onExitComplete = () => window.scrollTo(0, 0)

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem>
      <SkipToContent />
      <LazyMotion features={domAnimation}>
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
