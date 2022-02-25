import Button from '@/components/atoms/Button'

import useTheme from '@/hooks/useTheme'
import variants from '@/libs/animation/variants'

import clsx from 'clsx'
import { AnimatePresence, Variants, m } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'

const v = ((): Variants => ({
  ...variants(),
  exit: {
    y: -30,
    opacity: 1
  }
}))()

const MotionComponent: React.FC = ({ children }) => (
  <m.span variants={v} initial='hidden' animate='visible' exit='exit'>
    {children}
  </m.span>
)

const DarkMode: React.FC = () => {
  const { theme, mounted, changeTheme } = useTheme()

  if (!mounted) return null

  return (
    <Button
      onClick={changeTheme}
      className={clsx(
        'accessible',
        'w-10 md:w-12 aspect-square rounded overflow-hidden',
        'bg-primary-100 dark:bg-theme-700'
      )}
    >
      <AnimatePresence exitBeforeEnter>
        {theme === 'dark' ? (
          <MotionComponent key={0}>
            <HiMoon className='md:text-lg text-yellow-400' />
          </MotionComponent>
        ) : (
          <MotionComponent key={1}>
            <HiSun className='md:text-lg text-primary-700' />
          </MotionComponent>
        )}
      </AnimatePresence>
    </Button>
  )
}

export default DarkMode
