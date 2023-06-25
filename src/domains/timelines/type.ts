export type TimeLineItemList = {
  id: string
  description: string
}

export type CreateTimelinePayload = {
  titles: string[]
  dates: string[]
  emojis: Array<Timeline['emoji']>
  lists: string[][]
}

export type Timeline = {
  id: string
  title: string
  date: string
  emoji: 'SCHOOL' | 'CAREER' | 'LIFE' | 'CURRENT_EVENT' | 'OTHER'
  list: TimeLineItemList[]
  currentEvent?: boolean
}
