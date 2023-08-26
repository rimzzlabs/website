import { responseJSON } from '@/utils/response-json'

import type { TCommentMutationPayload } from '@/types/comment'

import { createComment, deleteComment, getComments } from './utils'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  return getComments(slug)
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as TCommentMutationPayload

  if (!payload?.body || !payload?.slug) {
    return responseJSON({ slug: payload?.slug ?? null, message: 'failed' }, 400)
  }

  return createComment(payload)
}

export async function DELETE(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get('commentId')
  const slug = req.nextUrl.searchParams.get('slug')

  return deleteComment(commentId, slug)
}
