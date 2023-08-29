import { formatDateToISO } from './date'

import type { Comment, User } from '@prisma/client'

type TNormalizeCommentsParam = (Comment & { User: User | null })[]
export const normalizeComments = (comments: TNormalizeCommentsParam) => {
  return comments.map((comment) => {
    return {
      id: comment.id,
      body: comment.body,
      slug: comment.slug,
      createdAt: formatDateToISO(comment.createdAt),
      user: {
        email: comment.User?.email ?? null,
        image: comment.User?.image ?? null,
        name: comment.User?.name ?? null,
      },
    }
  })
}
