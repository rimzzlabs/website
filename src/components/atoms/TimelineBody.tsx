import { forwardRef } from 'react'

interface TimelineBodyProps {
  start_date: string
  end_date: string
  description: string
}

const TimelineBody = forwardRef<HTMLDivElement, TimelineBodyProps>(({ description, end_date, start_date }, ref) => {
  return (
    <div className='transition-all duration-300 max-h-0 overflow-hidden' ref={ref}>
      <p className='my-2 text-sm'>
        {start_date} - {end_date}
      </p>

      <p>{description}</p>
    </div>
  )
})

TimelineBody.displayName = 'TimelineBody'

export default TimelineBody
