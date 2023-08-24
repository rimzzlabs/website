import { responseJSON } from '@/utils/response-json'

import type { TPostViewsResponse } from '@/types/views'

import { getViews } from './utils'

import type { NextRequest } from 'next/server'

type TResponse = Omit<TPostViewsResponse, 'slug'> & {
  slug: null | string
}

export default async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return responseJSON<TResponse>({ slug, count: 0, message: 'failed' }, 400)
  }

  try {
    const views = await getViews(slug)

    return responseJSON<TResponse>({ slug, count: views, message: 'success' }, 200)
  } catch (error) {
    return responseJSON<TResponse>({ slug, count: 0, message: 'failed' }, 500)
  }
}
