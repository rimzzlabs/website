import { Timeline } from '@/libs/constants/timeline'
import { twclsx } from '@/libs/twclsx'

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
      className={twclsx('flex items-start justify-between', 'md:cursor-pointer')}
      onClick={onClick}
    >
      <div>
        <h3>{title}</h3>
        <div className={twclsx('flex items-center', 'mt-2 mb-4', 'text-sm')}>
          {type === 'edu' ? <HiAcademicCap /> : <HiDesktopComputer />}
          <p className={twclsx('ml-1')}>— {place}</p>
        </div>
      </div>
      <div className={twclsx('mt-2')} ref={ref}>
        <HiChevronDown className={twclsx('text-lg')} />
      </div>
    </div>
  )
})

TimelineHeader.displayName = 'TimelineHeader'

export default TimelineHeader
