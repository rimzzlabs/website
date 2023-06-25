import { randomId } from '@/utils/random-id'

import { CreateTimelinePayload, Timeline } from '../type'
import createTimelineItem from './create-timeline-item'
import createEmojiTimeline from './emoji-timeline-item'

export const createTimelines = (payload: CreateTimelinePayload) => {
  return new Promise<Timeline[]>((resolve, reject) => {
    const { emojis, dates, lists, titles } = payload

    const timelines = titles.map((title, index) => {
      const id = randomId()
      const emoji = createEmojiTimeline(emojis[index])
      const date = dates[index]
      const timelineItems = lists[index]
      if (!emoji || !date || !date || !timelineItems) {
        reject(new Error('Timelines data is not complete!'))
        return
      }

      const list = createTimelineItem(...timelineItems)

      if (!list) {
        reject(new Error('Timelines data of lists is not completed!'))
        return
      }

      return {
        id,
        title,
        emoji,
        date,
        list: createTimelineItem(...timelineItems),
        currentEvent: index === titles.length - 1,
      }
    }) as Timeline[]

    resolve(timelines)
  })
}
