import clsx from 'clsx'
import { forwardRef } from 'react'
import { HiChevronDown } from 'react-icons/hi'

interface TimelineHeaderProps {
  onClick: () => void
  title: string
  place: string
}

const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(({ onClick, title, place }, ref) => {
  return (
    <div
      title='click to expand'
      className={clsx('flex items-start justify-between', 'md:cursor-pointer')}
      onClick={onClick}
    >
      <div>
        <h3>{title}</h3>
        {place && <p className='mt-2 mb-4 text-sm'>{place}</p>}
      </div>
      <div className='mt-2' ref={ref}>
        <HiChevronDown className='text-lg' />
      </div>
    </div>
  )
})

TimelineHeader.displayName = 'TimelineHeader'

export default TimelineHeader
