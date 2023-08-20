import { authOptions } from './auth'
import { responseJSON } from './response-json'

import { prisma } from '@db/prisma'
import type { Reaction } from '@prisma/client'
import { getServerSession } from 'next-auth'
import type { NextRequest } from 'next/server'
import { P, match } from 'ts-pattern'

type TReactionType = 'like' | 'love' | 'rocket'

export type TCounterReactions = {
  counters: {
    [K in TReactionType]: number
  }
}

export type TReturnReaction<TData, TError = Error> = readonly [null | TData, TError | null]

export type TPostReactionParam = {
  slug: string
  name: string
}

const parseReactions = (data: Reaction[]) => {
  return data.reduce(
    (acc, cur) => {
      acc.like += cur.name === 'like' ? 1 : 0
      acc.love += cur.name === 'love' ? 1 : 0
      acc.rocket += cur.name === 'rocket' ? 1 : 0
      return acc
    },
    {
      like: 0,
      love: 0,
      rocket: 0,
    },
  )
}

export const getReactions = async (req: NextRequest, slug?: string | null) => {
  if (!slug) {
    return responseJSON({ message: 'missing slug' }, 400)
  }

  const res = await prisma.reaction.findMany({
    where: {
      slug,
    },
  })

  const reactions = parseReactions(res)
  return responseJSON({ message: 'success', slug, data: { counters: reactions } }, 200)
}

export const postReaction = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)
  const requestBody = (await req.json()) as TPostReactionParam | undefined

  const body = match(requestBody)
    .with(P.shape({ slug: P.string, name: P.string }).select(), (body) => body)
    .otherwise(() => null)

  const user = match(session)
    .with(P.nullish, () => null)
    .otherwise((session) =>
      match(session.user)
        .with(P.nullish, () => null)
        .otherwise((user) => user),
    )

  if (!user || !user.email) {
    return responseJSON({ message: 'unauthenticated' }, 401)
  }

  if (!body) {
    return responseJSON({ message: 'missing body' }, 400)
  }

  try {
    const { name, slug } = body

    await prisma.reaction.create({
      data: {
        name,
        slug,
        userEmail: user.email,
      },
    })

    return responseJSON({ message: 'sucess', slug }, 201)
  } catch (err) {
    return responseJSON({ message: 'Server Error', detail: err }, 500)
  }
}
