import { getUser } from '@/utils/auth'
import { responseJSON } from '@/utils/response-json'

import type {
  TComment,
  TCommentMutationPayload,
  TCommentResponsePOST,
  TSubCommentMutationPayload,
} from '@/types/comment'

import { prisma } from '@db/prisma'

export async function getComments(slug: string): Promise<TComment[]> {
  try {
    const res = await prisma.comment.findMany({
      where: {
        slug,
      },
      include: {
        User: true,
        subcomments: {
          include: {
            User: true,
          },
        },
      },
    })

    return res.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        slug: comment.slug,
        createdAt: comment.createdAt.toISOString(),
        sub: comment.subcomments.map((subComment) => ({
          id: comment.id,
          commentId: subComment.commentId,
          body: subComment.body,
          slug: subComment.slug,
          createdAt: subComment.createdAt.toISOString(),
          user: {
            image: subComment.User?.image ?? null,
            name: subComment.User?.name ?? null,
          },
        })),
        user: {
          image: comment.User?.image ?? null,
          name: comment.User?.name ?? null,
        },
      }
    })
  } catch (err) {
    return []
  }
}

export async function createComment(payload: TCommentMutationPayload) {
  try {
    const user = await getUser()
    if (!user) {
      return 'unauthorized' as const
    }

    const res = await prisma.comment.create({
      data: {
        body: payload.body,
        slug: payload.slug,
        userId: user.id,
      },
    })
    return res
  } catch (err) {
    return null
  }
}
export async function createSubComment(payload: TSubCommentMutationPayload) {
  try {
    const user = await getUser()
    if (!user) {
      return 'unauthorized' as const
    }

    const res = await prisma.subComment.create({
      data: {
        commentId: payload.commentId,
        body: payload.body,
        slug: payload.slug,
        userId: user.id,
      },
    })
    return res
  } catch (err) {
    return null
  }
}

//  create a function that return responseJSON of status code 401
export function unauthorized() {
  return responseJSON<TCommentResponsePOST>(
    {
      slug: '',
      message: 'failed',
    },
    401,
  )
}
