import { badRequest, responseOK, serverError } from '@/api/response'
import type { TPostViewsResponse } from '@/types/views'

import { getViews } from './utils'

import type { NextRequest } from 'next/server'

type TResponse = Omit<TPostViewsResponse, 'slug'> & {
  slug: null | string
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return badRequest<TResponse>({
      slug,
      count: 0,
      message: 'Failed to GET post views: missing `slug`',
    })
  }

  const [views, error] = await getViews(slug)

  if (error) {
    return serverError<TResponse>({ message: 'Cannot GET post views', count: 0, slug })
  }

  return responseOK<TResponse>({ slug, count: views, message: 'GET post views successfully' })
}
