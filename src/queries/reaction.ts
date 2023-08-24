import { BASE_URL } from '@/utils/env/client'

import type { TReactionType } from '@/types/reaction'

import { buildMutation, buildQuery } from './builder'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type TReactionResponse = {
  message: string
  slug: string
  data: {
    counters: {
      [K in TReactionType]: number
    }
    userCounters?: {
      [K in TReactionType]: number
    }
  }
}

export const useReactions = (slug: string) => {
  return useQuery({
    queryKey: ['GET_REACTIONS', slug],
    queryFn: buildQuery<TReactionResponse>({
      url: `${BASE_URL}/api/post/reaction`,
      params: { slug },
    }),
  })
}

export const useMutateReactions = () => {
  const client = useQueryClient()
  type TReactionPayload = {
    slug: string
    name: string
  }

  return useMutation({
    mutationFn: buildMutation<TReactionResponse, TReactionPayload>({
      url: `${BASE_URL}/api/post/reaction`,
      method: 'POST',
    }),
    onSuccess: (data) => {
      client.invalidateQueries(['GET_REACTIONS', data.slug])
    },
  })
}
