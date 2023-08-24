import { BASE_URL } from '@/utils/env/client'

import type {
  TCommentMutationPayload,
  TCommentResponse,
  TCommentResponsePOST,
} from '@/types/comment'

import { buildMutation, buildQuery } from './builder'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useComments = (slug: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['GET_COMMENTS', slug],
    queryFn: buildQuery<TCommentResponse>({
      url: `${BASE_URL}/api/post/comment`,
      params: { slug },
    }),
    enabled,
  })
}

export const useMutateComment = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: buildMutation<TCommentResponsePOST, TCommentMutationPayload>({
      url: `${BASE_URL}/api/post/comment`,
      method: 'POST',
    }),
    onSuccess: (data) => {
      client.invalidateQueries(['GET_COMMENTS', data.slug])
    },
  })
}
