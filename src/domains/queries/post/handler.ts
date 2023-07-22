import { SITE_URL } from '@/domains/seo'

import { asyncFetchJSON } from '@/utils/async-fetch'

import type { PostViewsResponseAPI } from '@/app/api/post-views/route'

export const getPostViewsQuery = (slug: string) => {
  return async () => {
    const baseURL = process.env.NODE_ENV === 'production' ? SITE_URL : 'http://localhost:3222'

    const url = new URL('api/post-views', baseURL)
    url.searchParams.append('slug', slug)

    const [data, error] = await asyncFetchJSON<PostViewsResponseAPI>(url.toString(), {
      method: 'GET',
    })

    if (error || !data.data) throw new Error('Cannog get post-views')

    return data.data.views
  }
}
