import { twclsx } from '@/libs'
import { dateFormat, dateStringToISO } from '@/libs/intl'

import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import { useMemo } from 'react'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineEye } from 'react-icons/hi'

type HeadingContentProps = {
  title: string
  summary: string
  published: string
  postViews: number
  est_read?: string
}

const DELAY = 0.5

export const HeadingContent: React.FunctionComponent<HeadingContentProps> = (props) => {
  const config: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    []
  )

  const sentenceVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition: { delay: DELAY, type: 'tween', duration: 0.5 } }
    }),
    []
  )

  const indicatorVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { delay: DELAY + 0.2, ease: 'anticipate', duration: 0.7 } }
    }),
    []
  )

  const lineVariants = useMemo<Variants>(
    () => ({
      hidden: { width: 0, opacity: 0.5 },
      visible: { width: '100%', opacity: 1, transition: { delay: DELAY + 0.5, ease: 'anticipate', duration: 2 } }
    }),
    []
  )

  return (
    <section>
      <m.h1
        initial='hidden'
        animate='visible'
        variants={sentenceVariants}
        className={twclsx('max-w-prose', 'text-3xl md:text-5xl', 'mb-8')}
      >
        {props.title}
      </m.h1>

      <m.div
        initial='hidden'
        animate='visible'
        variants={indicatorVariants}
        className={twclsx('flex flex-col', 'gap-4', 'md:flex-row md:items-center md:justify-between')}
      >
        <div className={twclsx('flex items-center', 'gap-4')}>
          <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
            <HiOutlineClock className={twclsx('text-lg')} />
            <p>{props.est_read}</p>
          </div>

          <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
            <HiOutlineEye className={twclsx('text-lg')} />
            {props.postViews > 0 ? <p>{props.postViews} views</p> : <p>—</p>}
          </div>
        </div>
        <div className={twclsx('flex items-center', 'gap-2')}>
          <HiOutlineCalendar className={twclsx('text-lg')} />
          <time className={twclsx('text-sm md:text-base')} dateTime={dateStringToISO(props.published)}>
            {dateFormat(props.published, undefined, config)}
          </time>
        </div>
      </m.div>

      <m.hr
        initial='hidden'
        animate='visible'
        variants={lineVariants}
        className={twclsx('mt-8 border-theme-300 dark:border-theme-700')}
      />
    </section>
  )
}
