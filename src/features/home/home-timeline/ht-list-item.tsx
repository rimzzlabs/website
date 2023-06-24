import { type Timeline } from '@/domains/timelines'

import { tw } from '@/utils/tw'

export const HomeTimlineListItem = (props: Timeline) => {
  return (
    <li
      className={tw(
        'relative',
        'pl-4 pb-10 last-of-type:pb-0',
        'border-l-4 last-of-type:!border-l-transparent',
        'border-l-base-200 dark:border-l-base-900',
      )}
    >
      <h3 className='leading-none mb-2'>
        {props.emoji}
        {props.date}
      </h3>
      <h4>{props.title}</h4>
      {props.list.length > 0 && (
        <ul className='list-disc space-y-1.5 mt-2.5 ml-4'>
          {props.list.map((item) => {
            return (
              <li className='text-sm font-medium max-w-prose' key={item.id}>
                {item.description}
              </li>
            )
          })}
        </ul>
      )}

      <div className={tw('absolute', '-left-3 top-0')}>
        <div
          className={tw(
            'relative w-5 h-5 rounded-full',
            'bg-base-300 dark:bg-base-800',
            props.currentEvent && 'bg-primary-500 dark:bg-primary-600',
          )}
        >
          {props.currentEvent && (
            <div className='absolute inset-0 rounded-full bg-primary-400 dark:bg-primary-500 animate-ping' />
          )}
        </div>
      </div>
    </li>
  )
}
