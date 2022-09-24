import variants, { withExit } from '@/libs/animation/variants'
import { twclsx } from '@/libs/twclsx'

import { useWindowScrollY } from '@/hooks'

import { AnimatePresence, m } from 'framer-motion'
import { useCallback } from 'react'
import { HiOutlineArrowUp } from 'react-icons/hi'

export const BackToTop: React.FunctionComponent = () => {
  const yAxis = useWindowScrollY()
  const handleClick = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  const v = withExit(variants)

  return (
    <AnimatePresence exitBeforeEnter>
      {yAxis > 200 ? (
        <m.button
          title='back to top'
          variants={v}
          initial='hidden'
          animate='visible'
          exit='exit'
          onClick={handleClick}
          className={twclsx(
            'accessible',
            'fixed md:bottom-[12vh] lg:right-[8vw]',
            'bottom-[6vh] right-[6vw]',
            'inline-flex items-center justify-center',
            'h-10 w-10 z-[1]',
            'rounded-xl md:text-lg',
            'text-primary-700 dark:text-primary-400',
            'bg-primary-100 dark:bg-theme-800'
          )}
        >
          <span className={twclsx('sr-only')}>Back To Top</span>
          <HiOutlineArrowUp />
        </m.button>
      ) : null}
    </AnimatePresence>
  )
}
