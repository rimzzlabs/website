import { Timeline } from '@/libs/constants/timeline'
import dateFormat from '@/libs/dateFormat'

import clsx from 'clsx'

interface TimelineListProps {
  timeline: Array<Timeline>
}

const TimelineList: React.FC<TimelineListProps> = ({ timeline }) => (
  <ul className='pl-2'>
    {timeline
      .slice()
      .sort((a, b) => (new Date(a.start_date) < new Date(b.start_date) ? 1 : -1))
      .map((data: Timeline, idx: number) => (
        <li
          key={idx}
          className={clsx(
            'relative w-full pl-4',
            'before:absolute before:left-0 before:top-2 last:before:top-[unset]',
            'before:h-full before:w-px',
            'last:pb-0 pb-4 md:pb-6 before:bg-theme-300 dark:before:bg-transparent',
            'dark:before:bg-gradient-to-b dark:before:from-primary-500 dark:before:to-ternary-500'
          )}
        >
          <h3>{data.title}</h3>
          {data.place && <p className='mt-2 mb-4 text-sm'>{data.place}</p>}

          <p className='my-2 text-sm'>
            {dateFormat(data.start_date.toISOString())} -{' '}
            {data?.end_date ? dateFormat(data.end_date.toISOString()) : 'now'}
          </p>

          <p>{data.description}</p>
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
              'absolute -left-[0.35rem] top-2',
              'bg-theme-700 dark:bg-transparent',
              'dark:bg-gradient-to-b dark:from-primary-500 dark:to-ternary-500'
            )}
          />
        </li>
      ))}
  </ul>
)

export default TimelineList
