import umami from '@/libs/umami'

import { getTokenFromUmami } from './getTokenFromUmami'

export interface PageViews {
  bounces: { value: number; change: number }
  pageviews: { value: number; change: number }
  totaltime: { value: number; change: number }
  unique: { value: number; change: number }
}

interface PageViewsReturn {
  isError: boolean
  data: PageViews | null
}

export const getPageViews = async (slug: string): Promise<PageViewsReturn> => {
  const end_date = new Date().getTime()

  const token = await getTokenFromUmami()
  if (!token) {
    return { isError: true, data: null }
  }

  const config = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const res = await umami.get<PageViews>(
      `/api/website/1/stats?start_at=${1645722000000}&end_at=${end_date}&url=${slug}`,
      config
    )

    if (res.status !== 200) {
      return { isError: true, data: res.data }
    }

    return { isError: false, data: res.data }
  } catch (error) {
    console.info(error)
    return { isError: true, data: null }
  }
}
