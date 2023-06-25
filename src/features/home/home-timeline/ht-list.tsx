import { Timeline } from '@/domains/timelines'

import { tw } from '@/utils/tw'

import { HomeTimlineListItem } from './ht-list-item'

type Props = {
  timelines: Timeline[]
}
export const HomeTimelineList = (props: Props) => {
  return (
    <ul className={tw('flex flex-col', 'mt-6')}>
      {props.timelines.map((timeline) => (
        <HomeTimlineListItem key={timeline.id} {...timeline} />
      ))}
    </ul>
  )
}
