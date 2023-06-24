import { randomId } from '@/utils/random-id'

import { Timeline } from '../type'
import createTimelineItem from './create-timeline-item'
import createEmojiTimeline from './emoji-timeline-item'

type CreateTimelinePayload = {
  titles: string[]
  dates: string[]
  emojis: Array<Timeline['emoji']>
  lists: string[][]
}

export const createTimelines = (payload: CreateTimelinePayload) => {
  const { emojis, dates, lists, titles } = payload

  return titles.map((title, index) => {
    const emoji = createEmojiTimeline(emojis[index])

    return {
      title,
      emoji,
      date: dates[index],
      id: randomId(),
      list: createTimelineItem(...lists[index]),
      currentEvent: index === titles.length - 1,
    }
  }) as Timeline[]
}
