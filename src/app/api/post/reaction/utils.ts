import { getUser } from '@/utils/auth'
import type { TPostReactionPayload } from '@/utils/reaction'
import { responseJSON } from '@/utils/response-json'

import { prisma } from '@db/prisma'
import type { Reaction } from '@prisma/client'
import type { NextRequest } from 'next/server'
import { P, match } from 'ts-pattern'

function parseReactions(data: Reaction[]) {
  return data.reduce(
    (acc, cur) => {
      acc.star += cur.name === 'star' ? 1 : 0
      acc.love += cur.name === 'love' ? 1 : 0
      acc.rocket += cur.name === 'rocket' ? 1 : 0
      return acc
    },
    {
      star: 0,
      love: 0,
      rocket: 0,
    },
  )
}
export async function getReactions(req: NextRequest, slug: string) {
  const user = await getUser()

  const reactions = await prisma.reaction.findMany({
    where: {
      slug,
    },
  })

  const counters = parseReactions(reactions)
  if (!user) {
    return responseJSON({ message: 'success', slug, data: { counters } }, 200)
  }

  const userReactions = await prisma.reaction.findMany({
    where: {
      userId: user.id,
      slug,
    },
  })
  const userCounters = parseReactions(userReactions)

  return responseJSON({ message: 'success', slug, data: { counters, userCounters } }, 200)
}

export async function createReaction(req: NextRequest) {
  const user = await getUser()
  const requestBody = (await req.json()) as TPostReactionPayload | undefined

  const body = match(requestBody)
    .with(P.shape({ slug: P.string, name: P.string }).select(), (body) => body)
    .otherwise(() => null)

  if (!body) {
    return responseJSON({ message: 'missing body' }, 400)
  }

  if (!user) {
    return responseJSON({ message: 'unauthenticated!' }, 401)
  }

  try {
    const { name, slug } = body

    await prisma.reaction.create({
      data: {
        name,
        slug,
        userId: user.id,
      },
    })

    return responseJSON({ message: 'sucess', slug }, 201)
  } catch (err) {
    return responseJSON({ message: 'Server Error', detail: err }, 500)
  }
}
