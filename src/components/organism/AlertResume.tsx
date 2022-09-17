import Button from '@/components/atoms/Button'
import { resumeModalVariants } from '@/components/organism/PopupResume'

import { twclsx } from '@/libs/twclsx'

import { AnimatePresence, m } from 'framer-motion'

type AlertResumeProps = {
  isOpen: boolean
  onClose: () => void
}

const AlertResume: React.FunctionComponent<AlertResumeProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const v = resumeModalVariants

  return (
    <AnimatePresence exitBeforeEnter>
      {props.isOpen && (
        <m.div
          onClick={props.onClose}
          variants={v}
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

            <Button
              onClick={props.onClose}
              className='h-8 md:h-10 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white'
            >
              Got it!
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default AlertResume
