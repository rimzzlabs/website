import { Code } from '@/components/content'

import { UnstyledButton } from '@/UI/buttons'

import { twclsx } from '@/libs/twclsx'

import { useTheme } from '@/hooks'

import { AnimatePresence, m } from 'framer-motion'
import type { Variants } from 'framer-motion'

type HowToPrintProps = {
  isOpen: boolean
  onClose: () => void
}

const variants: Variants = {
  hide: { scale: 0.85, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition: { ease: 'easeOut', duration: 0.25 } },
  exit: { scale: 0.75, opacity: 0 }
}

export const HowToPrintDialog: React.FunctionComponent<HowToPrintProps> = (props) => {
  const { theme, changeTheme } = useTheme()

  return (
    <AnimatePresence exitBeforeEnter>
      {props.isOpen && (
        <m.div
          onClick={props.onClose}
          variants={variants}
          initial='hide'
          animate='enter'
          exit='exit'
          className={twclsx(
            'fixed inset-0 z-10',
            'flex items-center justify-center',
            'bg-white/40 dark:bg-theme-900/40',
            '[@supports(backdrop-filter:blur(0))]:backdrop-blur'
          )}
        >
          <div
            className={twclsx(
              'w-11/12 max-w-lg',
              'p-4 rounded-lg shadow-lg dark:shadow-none',
              'bg-white dark:bg-theme-800'
            )}
          >
            <h3>Want to print the resume?</h3>

            <p className='prose dark:prose-invert'>
              on windows or linux, press <Code>ctrl + p</Code>
            </p>
            <p className='prose dark:prose-invert'>
              on mac, press <Code>⌘ + p</Code>
            </p>
            {theme === 'dark' && (
              <p className='text-sm py-1.5 px-2.5 mt-2.5 font-medium rounded-lg inline-block bg-yellow-100 text-yellow-800'>
                <strong>Note: </strong>For a better result, switch to light mode when you want to print my resume.{' '}
                <UnstyledButton className='border-b border-yellow-800' onClick={changeTheme('light')}>
                  Switch to Light Mode
                </UnstyledButton>
              </p>
            )}
            <UnstyledButton
              onClick={props.onClose}
              className='mt-2.5 px-4 h-8 md:h-9 rounded-lg bg-primary-500 text-white'
            >
              Got it!
            </UnstyledButton>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

type AlertResumeProps = {
  isOpen: boolean
  onClose: () => void
}

export const AlertResume: React.FunctionComponent<AlertResumeProps> = (props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {props.isOpen && (
        <m.div
          onClick={props.onClose}
          variants={variants}
          initial='hide'
          animate='enter'
          exit='exit'
          className={twclsx(
            'fixed inset-0 z-10',
            'flex items-center justify-center',
            'bg-white/40 dark:bg-theme-900/40',
            '[@supports(backdrop-filter:blur(0))]:backdrop-blur'
          )}
        >
          <div
            className={twclsx(
              'w-11/12 max-w-lg',
              'p-4 rounded-lg shadow-lg dark:shadow-none',
              'bg-white dark:bg-theme-800'
            )}
          >
            <h3>Warning</h3>
            <p className='mt-2.5 mb-4'>
              For a better and <em>good looking</em> experience to view my resume, please use your computer, as if you
              look right now, the layout are kinda not enjoyable on mobile phone 😀.
            </p>

            <UnstyledButton
              onClick={props.onClose}
              className='h-8 md:h-10 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white'
            >
              Got it!
            </UnstyledButton>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
