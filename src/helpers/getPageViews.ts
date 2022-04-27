import { getTokenFromUmami } from '@/helpers/getTokenFromUmami'
import umami from '@/libs/umami'

export interface PageViews {
  bounces: { value: number; change: number }
  pageviews: { value: number; change: number }
  totaltime: { value: number; change: number }
  unique: { value: number; change: number }
}

interface PageViewsReturn {
  isError: boolean
  data: number | null
}

const reducePageViewsToNumber = (arr: Array<PageViews>) =>
  arr.reduce((acc, curVal) => {
    const newVal = acc.pageviews.value + curVal.pageviews.value

    acc.pageviews.value = newVal
    return acc
  }).pageviews.value

export const getPageViews = async (slug: string): Promise<PageViewsReturn> => {
  const end_date = new Date().getTime()

  const token = await getTokenFromUmami()
  if (!token) {
    return { isError: true, data: null }
  }

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const articleURL = `/api/website/1/stats?start_at=${1645722000000}&end_at=${end_date}&url=/article/${slug}`
  const blogURL = `/api/website/1/stats?start_at=${1645722000000}&end_at=${end_date}&url=/blog/${slug}`

  const responseArticle = await umami.get<PageViews>(articleURL, config)
  const responseBlog = await umami.get<PageViews>(blogURL, config)

  const mergedResponseData = Object.values([responseArticle.data, responseBlog.data])

  const data = reducePageViewsToNumber(mergedResponseData)

  return {
    isError: false,
    data
  }
}
