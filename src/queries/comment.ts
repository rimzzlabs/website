import { BASE_URL } from '@/utils/env/client'

import type { TCommentMutationPayload, TCommentResponse } from '@/types/comment'

import { buildDeleteMutation, buildMutation, buildQuery } from './builder'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useComments = (slug: string) => {
  return useQuery({
    queryKey: ['GET_COMMENTS', slug],
    queryFn: buildQuery<TCommentResponse>({
      url: `${BASE_URL}/api/post/comment`,
      params: { slug },
    }),
  })
}

export const useMutateComment = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: buildMutation<{ slug: string }, TCommentMutationPayload>({
      url: `${BASE_URL}/api/post/comment`,
      method: 'POST',
    }),
    onSuccess: (data) => {
      client.invalidateQueries(['GET_COMMENTS', data.slug])
    },
  })
}

export const useDeleteComment = (params: { commentId?: string | null; slug?: string | null }) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: buildDeleteMutation<{ slug: string }>({
      url: `${BASE_URL}/api/post/comment`,
      params,
    }),
    onSuccess(data) {
      client.invalidateQueries(['GET_COMMENTS', data.slug])
    },
  })
}
