import { randomId } from '@/utils/random-id'

const createTimelineItem = (...list: string[]) => {
  return list.map((description) => ({ id: randomId(), description }))
}

export default createTimelineItem
