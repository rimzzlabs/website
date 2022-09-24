import { dateFormat } from '@/libs/intl'
import { twclsx } from '@/libs/twclsx'

import { TimelineHightlight } from './Highlight'

import { useCallback, useMemo, useRef } from 'react'
import { Timeline as TimelineType } from 'rizkicitra'

export const Timeline: React.FunctionComponent<TimelineType> = (props) => {
  const highlightProps = useMemo(() => {
    return { title: props.title, type: props.type, place: props.place }
  }, [props.title, props.type, props.place])
  const start_date_str = useMemo(() => {
    return dateFormat(props.start_date.toISOString(), undefined, { dateStyle: 'medium' })
  }, [props.start_date])
  const end_date_str = useMemo(() => {
    if (props.end_date) {
      return dateFormat(props.end_date.toISOString(), undefined, { dateStyle: 'medium' })
    }
    return 'on going'
  }, [props.end_date])

  const bodyRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    if (bodyRef.current && chevronRef.current) {
      bodyRef.current.classList.toggle('max-h-0')
      bodyRef.current.classList.toggle('max-h-[14rem]')
      chevronRef.current.classList.toggle('rotate-180')
    }
  }, [])

  return (
    <li
      className={twclsx(
        'relative w-full pl-4',
        'before:absolute before:left-0 before:top-2 last:before:top-[unset]',
        'before:h-full before:w-px',
        'last:pb-0 pb-4 md:pb-6 before:bg-theme-300 dark:before:bg-transparent',
        'dark:before:bg-gradient-to-b dark:before:from-primary-500 dark:before:to-ternary-500'
      )}
    >
      <TimelineHightlight ref={chevronRef} onClick={handleClick} {...highlightProps} />

      <div className={twclsx('max-h-0', 'overflow-hidden', 'transition-all duration-300')} ref={bodyRef}>
        <p className={twclsx('my-2', 'text-sm')}>
          {start_date_str} - {end_date_str}
        </p>
        <p>{props.description}</p>
      </div>

      <div
        className={twclsx(
          'w-3 h-3 rounded-full',
          'absolute -left-[0.35rem] top-2',
          'bg-theme-700 dark:bg-transparent',
          'dark:bg-gradient-to-b dark:from-primary-500 dark:to-ternary-500'
        )}
      />
    </li>
  )
}
