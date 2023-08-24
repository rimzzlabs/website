import { authOptions } from './auth'
import { responseJSON } from './response-json'

import { prisma } from '@db/prisma'
import type { Reaction } from '@prisma/client'
import { getServerSession } from 'next-auth'
import type { NextRequest } from 'next/server'
import { P, match } from 'ts-pattern'

type TReactionType = 'star' | 'love' | 'rocket'

export type TCounterReactions = {
  counters: {
    [K in TReactionType]: number
  }
}

export type TReturnReaction<TData, TError = Error> = readonly [null | TData, TError | null]

export type TPostReactionPayload = {
  slug: string
  name: string
}

const parseReactions = (data: Reaction[]) => {
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

export const getReactions = async (req: NextRequest, slug?: string | null) => {
  if (!slug) {
    return responseJSON({ message: 'missing slug' }, 400)
  }
  const session = await getServerSession(authOptions)

  const reactions = await prisma.reaction.findMany({
    where: {
      slug,
    },
  })

  const counters = parseReactions(reactions)

  if (session && session.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })
    if (!user) {
      //  just return response json regular reactions
      return responseJSON(
        {
          message: 'success',
          slug,
          data: {
            counters,
          },
        },
        200,
      )
    }

    const userReactions = await prisma.reaction.findMany({
      where: {
        userId: user.id,
        slug,
      },
    })
    const userCounters = parseReactions(userReactions)

    return responseJSON(
      {
        message: 'success',
        slug,
        data: {
          counters,
          userCounters,
        },
      },
      200,
    )
  }

  return responseJSON({ message: 'success', slug, data: { counters } }, 200)
}

export const postReaction = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)
  const requestBody = (await req.json()) as TPostReactionPayload | undefined

  const body = match(requestBody)
    .with(P.shape({ slug: P.string, name: P.string }).select(), (body) => body)
    .otherwise(() => null)

  if (!body) {
    return responseJSON({ message: 'missing body' }, 400)
  }

  if (session && session.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return responseJSON({ message: 'unauthenticated!' }, 401)
    }
    try {
      const { name, slug } = body

      await prisma.reaction.create({
        data: {
          name,
          slug,
          userId: user?.id,
        },
      })

      return responseJSON({ message: 'sucess', slug }, 201)
    } catch (err) {
      return responseJSON({ message: 'Server Error', detail: err }, 500)
    }
  }

  return responseJSON({ message: 'unauthenticated!' }, 401)
}
