import { timelines } from '@/domains/timelines'

import { tw } from '@/utils/tw'

import { HomeTimlineListItem } from './ht-list-item'

export const HomeTimelineList = () => {
  return (
    <ul className={tw('flex flex-col', 'mt-6')}>
      {timelines.map((timeline) => (
        <HomeTimlineListItem key={timeline.id} {...timeline} />
      ))}
    </ul>
  )
}
