import { normalizeComments } from '@/utils/comment'

import type { TComment, TCommentMutationPayload } from '@/types/comment'

import { prisma } from '@db/prisma'
import type { User } from '@prisma/client'

export async function getComments(slug: string) {
  try {
    const res = await prisma.comment.findMany({
      where: {
        slug,
      },
      include: {
        User: true,
      },
    })

    const comments = normalizeComments(res)

    return [comments as TComment[], null] as const
  } catch (err) {
    return [null, err as Error] as const
  }
}

type TPostPayload = {
  body: TCommentMutationPayload
  user: User
}
export async function createComment(payload: TPostPayload) {
  try {
    await prisma.comment.create({
      data: {
        body: payload.body.body.replace(/<p\s*>(\s*<br\s*\/?>\s*)*<\/p>/g, ''),
        slug: payload.body.slug,
        userId: payload.user.id,
      },
    })
    return true
  } catch (err) {
    return false
  }
}

export async function deleteComment(payload: { user: User; commentId: string; slug: string }) {
  try {
    await prisma.comment.delete({
      where: {
        id: payload.commentId,
        AND: {
          userId: payload.user.id,
        },
      },
    })
    return true
  } catch (error) {
    false
  }
}
