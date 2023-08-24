import { getUser } from '@/utils/auth'
import { responseJSON } from '@/utils/response-json'

import type {
  TCommentResponse,
  TCommentResponsePOST,
  TMergedCommentMutationPayload,
} from '@/types/comment'

import { createComment, createSubComment, getComments, unauthorized } from './utils'

import type { NextRequest } from 'next/server'

type TResponseGET = Omit<TCommentResponse, 'data'> & {
  data: TCommentResponse['data'] | null
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return responseJSON<TResponseGET>(
      {
        data: null,
        message: 'failed',
      },
      400,
    )
  }

  const comments = await getComments(slug)

  if (comments.length === 0) {
    return responseJSON<TResponseGET>({ data: null, message: 'failed' }, 500)
  }

  return responseJSON<TResponseGET>({ data: comments, message: 'success' }, 200)
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  const payload = (await req.json()) as TMergedCommentMutationPayload

  if (!user) {
    return unauthorized()
  }

  if (!payload?.body || !payload?.slug || !payload?.type) {
    return responseJSON<TCommentResponsePOST>(
      {
        slug: '',
        message: 'failed',
      },
      400,
    )
  }

  if (payload.type === 'comment') {
    const res = await createComment(payload)
    if (res === 'unauthorized') {
      return unauthorized()
    }

    return responseJSON<TCommentResponsePOST>({ slug: payload.slug, message: 'success' }, 201)
  }

  const res = await createSubComment(payload)
  if (res === 'unauthorized') {
    return unauthorized()
  }

  return responseJSON<TCommentResponsePOST>({ slug: payload.slug, message: 'success' }, 201)
}
