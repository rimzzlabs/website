import { Timeline } from '@/libs/constants/timeline'

import clsx from 'clsx'
import { forwardRef } from 'react'
import { HiAcademicCap, HiChevronDown, HiDesktopComputer } from 'react-icons/hi'

interface TimelineHeaderProps {
  onClick: () => void
  title: string
  place: string
  type: Timeline['type']
}

const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(({ onClick, title, place, type }, ref) => {
  return (
    <div
      title='click to expand'
      className={clsx('flex items-start justify-between', 'md:cursor-pointer')}
      onClick={onClick}
    >
      <div>
        <h3>{title}</h3>
        <div className='flex items-center mt-2 mb-4 text-sm'>
          {type === 'edu' ? <HiAcademicCap /> : <HiDesktopComputer />}
          <p className='ml-1'>— {place}</p>
        </div>
      </div>
      <div className='mt-2' ref={ref}>
        <HiChevronDown className='text-lg' />
      </div>
    </div>
  )
})

TimelineHeader.displayName = 'TimelineHeader'

export default TimelineHeader
