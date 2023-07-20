import { prisma } from '@/utils/ssr/prisma-client'

import type { Comment, SubComment } from './type'

export const getComments = async (slug: string) => {
  if (!slug) return null

  try {
    const comments = await prisma.comment.findMany({
      where: {
        slug,
      },
    })
    if (comments.length === 0) return []

    const promiseComments = comments.map<Promise<Comment>>(async (comment) => {
      const subComments = await prisma.subcomment.findMany({
        where: {
          comment_uuid: comment.uuid,
        },
      })

      if (subComments) {
        return {
          ...comment,
          subs: subComments as SubComment[],
        } as Comment
      }

      return comment as Comment
    })

    const allComments = await Promise.all(promiseComments)

    if (!allComments) {
      throw new Error('Cannot get comments', { cause: allComments })
    }

    return allComments
  } catch (error) {
    return []
  }
}
