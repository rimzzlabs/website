import Button from '@/components/atoms/Button'
import Drawer from '@/components/organism/Drawer'

import useDrawer from '@/hooks/useDrawer'
import { twclsx } from '@/libs/twclsx'

import { AnimatePresence, Variants, m } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

const DrawerToggler = () => {
  const v: Variants = {
    hidden: { scale: 0.25, opacity: 0, transition: { duration: 0.1 } },
    visible: { scale: 1, opacity: 1, transition: { type: 'tween', duration: 0.1 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.1 } }
  }
  const { changeState, isOpen } = useDrawer()

  return (
    <>
      <Button
        aria-label='toggle-drawer'
        id='toggle-drawer'
        className={twclsx('accesible', 'md:hidden', 'w-10 h-10 rounded-lg text-lg')}
        onClick={changeState}
      >
        <AnimatePresence exitBeforeEnter>
          {isOpen && (
            <m.span key={1} variants={v} initial='hidden' animate='visible' exit='exit'>
              <HiX />
            </m.span>
          )}
          {!isOpen && (
            <m.span key={2} variants={v} initial='hidden' animate='visible' exit='exit'>
              <HiMenuAlt4 />
            </m.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence exitBeforeEnter>{isOpen && <Drawer />}</AnimatePresence>
    </>
  )
}

export default DrawerToggler
