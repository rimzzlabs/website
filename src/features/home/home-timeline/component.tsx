import { createTimelines, timelines } from '@/domains/timelines'

import { HomeTimelineList } from './ht-list'

export const HomeTimeline = async () => {
  const timelineList = await createTimelines(timelines)

  return (
    <section>
      <h2 className='mb-3'>My Adventures</h2>
      <p>Everyone has their own unique story to share, and so do I.</p>
      <HomeTimelineList timelines={timelineList} />
    </section>
  )
}
