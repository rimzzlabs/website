import { getUser } from '@/utils/auth'

import { badRequest, responseOK, serverError, unauthorized } from '@/api/response'
import type { TCommentMutationPayload } from '@/types/comment'

import { createComment, deleteComment, getComments } from './utils'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return badRequest({ message: 'Missing slug', slug: null })
  }

  const [comments, error] = await getComments(slug)
  if (error) {
    return serverError({ message: 'Cannot fetch comments, please try again later', data: [], slug })
  }

  return responseOK({ message: 'Comments retrieved successfully', data: comments, slug })
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TCommentMutationPayload | undefined
  if (!body?.body || !body?.slug) {
    return badRequest({ message: 'Missing `body` or `slug`', slug: body?.slug ?? null })
  }

  const user = await getUser()
  if (!user) {
    return unauthorized({ slug: body?.slug ?? null })
  }

  const ok = await createComment({ body, user })
  if (!ok) {
    return serverError({
      message: 'Cannot create comment, please try again later',
      slug: body.slug,
    })
  }

  return responseOK({ message: 'Comment created successfully!', slug: body.slug })
}

export async function DELETE(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get('commentId')
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug || !commentId) {
    return badRequest({ message: 'Missing `slug` or `commentId`', slug: slug ?? null })
  }
  const user = await getUser()
  if (!user) {
    return unauthorized({ slug })
  }

  const ok = deleteComment({ commentId, slug, user })

  if (!ok) {
    return serverError({ message: 'Cannot delete comment, please try again later', slug })
  }

  return responseOK({ message: 'Comment deleted successfully!', slug })
}
