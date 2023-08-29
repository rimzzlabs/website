import type { Reaction } from '@prisma/client'

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

export const normalizeReactions = (data: Reaction[]) => {
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
