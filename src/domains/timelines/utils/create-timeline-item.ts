import { randomId } from '@/utils/random-id'

const createTimelineItem = (...list: string[]) => {
  if (list.length === 0) return null
  return list.map((description) => ({ id: randomId(), description }))
}

export default createTimelineItem
