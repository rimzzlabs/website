import { asyncFetchJSON } from '@/utils/async-fetch'
import { redis } from '@/utils/ssr'

import { UMAMI_DEPLOYED_URL } from '../constant'
import { getUmamiToken } from './get-umami-token'
import { getViewsFromRedis } from './get-views-from-redis'

type SubProp = { value: number; change: number }
type ResponsePageViews = {
  pageviews: SubProp
  uniques: SubProp
  bounces: SubProp
  totaltime: SubProp
}

export const getPostViews = async (slug: string): Promise<number> => {
  const viewsFromRedis = await getViewsFromRedis(slug)

  if (!viewsFromRedis) {
    const endDate = new Date().getTime()
    const token = await getUmamiToken()
    if (!token) return 0

    const url = `/api/website/1/stats?start_at=${1645722000000}&end_at=${endDate}&url=/blog/${slug}`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const [data, err] = await asyncFetchJSON<ResponsePageViews>(UMAMI_DEPLOYED_URL + url, config)

    if (err) {
      return 0
    }

    const views = data.pageviews.value

    await redis.set('PAGE_VIEWS_' + slug, views)

    return views
  }

  return viewsFromRedis
}
