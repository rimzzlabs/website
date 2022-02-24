import useWindowScroll from '@/hooks/useWindowScroll'
import variants, { withExit } from '@/libs/animation/variants'

import clsx from 'clsx'
import { AnimatePresence, Variants, m } from 'framer-motion'
import { HiOutlineArrowUp } from 'react-icons/hi'

const BackToTop: React.FC = () => {
  const yAxis = useWindowScroll()
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const v: Variants = withExit(variants)

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
          className={clsx(
            'accessible',
            'fixed md:bottom-[12vh] lg:right-[8vw]',
            'bottom-[6vh] right-[6vw]',
            'inline-flex items-center justify-center',
            'w-10 md:w-12 h-10 md:h-12 z-10',
            'rounded-md md:text-lg',
            'text-primary-700 dark:text-primary-400',
            'bg-primary-100 dark:bg-theme-800'
          )}
        >
          <span className='sr-only'>Back To Top</span>
          <HiOutlineArrowUp />
        </m.button>
      ) : null}
    </AnimatePresence>
  )
}

export default BackToTop
