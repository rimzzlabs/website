import { twclsx } from '@/libs/twclsx'

import { forwardRef } from 'react'

interface TimelineBodyProps {
  start_date: string
  end_date: string
  description: string
}

const TimelineBody = forwardRef<HTMLDivElement, TimelineBodyProps>(({ description, end_date, start_date }, ref) => {
  return (
    <div className={twclsx('max-h-0', 'overflow-hidden', 'transition-all duration-300')} ref={ref}>
      <p className={twclsx('my-2', 'text-sm')}>
        {start_date} - {end_date}
      </p>

      <p>{description}</p>
    </div>
  )
})

TimelineBody.displayName = 'TimelineBody'

export default TimelineBody
