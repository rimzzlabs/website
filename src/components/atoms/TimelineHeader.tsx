import { ChevronDown } from '@/components/atoms/Icons'

import clsx from 'clsx'
import { forwardRef } from 'react'

interface TimelineHeaderProps {
  onClick: () => void
  title: string
  place: string
}

const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(({ onClick, title, place }, ref) => {
  return (
    <div className={clsx('flex items-center justify-between', 'cursor-pointer')} onClick={onClick}>
      <div>
        <h3>{title}</h3>
        {place && <p className='mt-2 mb-4 text-sm'>{place}</p>}
      </div>
      <div className='accessible rounded-md p-1' ref={ref}>
        <ChevronDown />
      </div>
    </div>
  )
})

TimelineHeader.displayName = 'TimelineHeader'

export default TimelineHeader
