import SingleTimeline from '@/components/mollecules/SingleTimeline'

import { Timeline } from '@/libs/constants/timeline'

interface TimelineListProps {
  timeline: Array<Timeline>
}

const TimelineList: React.FC<TimelineListProps> = ({ timeline }) => (
  <ul className='pl-2'>
    {timeline
      .sort((a, b) => (new Date(a.start_date) < new Date(b.start_date) ? 1 : -1))
      .map((data: Timeline, idx: number) => (
        <SingleTimeline {...data} key={data.title + idx} />
      ))}
  </ul>
)

export default TimelineList
