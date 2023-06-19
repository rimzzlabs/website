import { type Timeline } from '@/features/home/home-timeline/ht-list'

import { randomId } from './random-id'

type CreateTimelinePayload = {
  titles: string[]
  dates: string[]
  cloudinaryImagePaths: string[]
  lists: string[][]
}

const createTimelineItemList = (...list: string[]) => {
  return list.map((description) => ({ id: randomId(), description }))
}

export const createTimelines = (payload: CreateTimelinePayload) => {
  const { cloudinaryImagePaths, dates, lists, titles } = payload

  return titles.map((title, index) => {
    const cloudinaryImagePath = `rizkicitra.dev/timeline-items/${cloudinaryImagePaths[index]}`

    return {
      title,
      cloudinaryImagePath,
      date: dates[index],
      id: randomId(),
      list: createTimelineItemList(...lists[index]),
      currentEvent: index === titles.length - 1,
    }
  }) as Timeline[]
}
