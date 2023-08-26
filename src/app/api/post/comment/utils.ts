import { getUser } from '@/utils/auth'
import { responseJSON } from '@/utils/response-json'

import type { TCommentMutationPayload } from '@/types/comment'

import { prisma } from '@db/prisma'

function unauthorized() {
  return responseJSON({ message: 'unauthorized!' }, 401)
}

export async function getComments(slug?: string | null) {
  if (!slug) {
    return responseJSON({ data: null, message: 'failed' }, 400)
  }

  try {
    const res = await prisma.comment.findMany({
      where: {
        slug,
      },
      include: {
        User: true,
      },
    })

    const comments = res.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        slug: comment.slug,
        createdAt: comment.createdAt.toISOString(),
        user: {
          email: comment.User?.email ?? null,
          image: comment.User?.image ?? null,
          name: comment.User?.name ?? null,
        },
      }
    })

    return responseJSON({ data: comments, message: 'success' }, 200)
  } catch (err) {
    console.info(err)
    return responseJSON({ data: [], message: 'failed' }, 500)
  }
}

export async function createComment(payload: TCommentMutationPayload) {
  try {
    const user = await getUser()

    if (!user) {
      return unauthorized()
    }

    await prisma.comment.create({
      data: {
        body: payload.body,
        slug: payload.slug,
        userId: user.id,
      },
    })
    return responseJSON({ message: 'success', slug: payload.slug }, 201)
  } catch (err) {
    console.info(err)
    return responseJSON({ message: 'failed', slug: payload.slug }, 500)
  }
}

export async function deleteComment(id?: string | null, slug?: string | null) {
  const user = await getUser()
  if (!id || !slug) {
    return responseJSON({ message: 'Missing comment id or slug' }, 400)
  }
  if (!user) {
    return unauthorized()
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
        AND: {
          userId: user.id,
        },
      },
    })
    return responseJSON({ message: 'success', slug }, 200)
  } catch (error) {
    return responseJSON({ message: 'Cannot delete comment', slug }, 500)
  }
}
