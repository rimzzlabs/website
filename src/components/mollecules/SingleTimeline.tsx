import TimelineBody from '@/components/atoms/TimelineBody'
import TimelineHeader from '@/components/atoms/TimelineHeader'

import { Timeline } from '@/libs/constants/timeline'
import dateFormat from '@/libs/dateFormat'
import { twclsx } from '@/libs/twclsx'

import { useRef } from 'react'

const SingleTimeline: React.FunctionComponent<Timeline> = ({
  title,
  place,
  start_date,
  end_date,
  description,
  type
}) => {
  const start_date_str = dateFormat(start_date.toISOString(), undefined, { dateStyle: 'medium' })
  const end_date_str = end_date ? dateFormat(end_date.toISOString(), undefined, { dateStyle: 'medium' }) : 'on going'

  const bodyRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (bodyRef.current && chevronRef.current) {
      bodyRef.current.classList.toggle('max-h-0')
      bodyRef.current.classList.toggle('max-h-[14rem]')
      chevronRef.current.classList.toggle('rotate-180')
    }
  }

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
      <TimelineHeader ref={chevronRef} onClick={handleClick} place={place} title={title} type={type} />
      <TimelineBody ref={bodyRef} description={description} start_date={start_date_str} end_date={end_date_str} />

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

export default SingleTimeline
