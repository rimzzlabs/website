import { UnstyledButton } from '@/UI/buttons'

import { twclsx } from '@/libs/twclsx'

import { useDrawer } from '@/hooks'

import { DrawerMenu } from './DrawerMenu'

import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

export const DrawerButton = () => {
  const v: Variants = {
    hidden: { scale: 0.25, opacity: 0, transition: { duration: 0.1 } },
    visible: { scale: 1, opacity: 1, transition: { type: 'tween', duration: 0.1 } },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.1 } }
  }
  const { changeState, isOpen } = useDrawer()

  return (
    <>
      <UnstyledButton
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
      </UnstyledButton>

      <AnimatePresence exitBeforeEnter>{isOpen && <DrawerMenu />}</AnimatePresence>
    </>
  )
}
