import { normalizeReactions, type TPostReactionPayload } from '@/utils/reaction'

import { prisma } from '@db/prisma'
import type { User } from '@prisma/client'

type TGetPayload = {
  slug: string
  user?: User | null
}
export async function getReactions(payload: TGetPayload) {
  try {
    const reactions = await prisma.reaction.findMany({
      where: {
        slug: payload.slug,
      },
    })

    const counters = normalizeReactions(reactions)
    if (!payload.user) {
      const data = { counters }

      return [data, null] as const
    }

    const userReactions = await prisma.reaction.findMany({
      where: {
        userId: payload.user.id,
        slug: payload.slug,
      },
    })
    const userCounters = normalizeReactions(userReactions)

    const data = {
      counters,
      userCounters,
    }

    return [data, null] as const
  } catch (error) {
    return [null, error as Error] as const
  }
}

type TPostPayload = {
  body: TPostReactionPayload
  user: User
}

export async function createReaction(payload: TPostPayload) {
  try {
    const { name, slug } = payload.body

    await prisma.reaction.create({
      data: {
        name,
        slug,
        userId: payload.user.id,
      },
    })

    return true
  } catch (err) {
    return false
  }
}
