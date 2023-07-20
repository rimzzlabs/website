import { asyncFetchJSON } from '@/utils/async-fetch'

import type { PostViewsResponseAPI } from '@/app/api/post-views/route'

export const getPostViewsQuery = (slug: string) => {
  return async () => {
    const url = `http://localhost:3222/api/post-views?slug=${slug}`

    const [data, error] = await asyncFetchJSON<PostViewsResponseAPI>(url, { method: 'GET' })

    if (error || !data.data) throw new Error('Cannog get post-views')

    return data.data.views
  }
}
