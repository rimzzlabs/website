import { BASE_URL } from '@/utils/env/client'

import type { TCommentResponsePOST, TSubCommentMutationPayload } from '@/types/comment'

import { buildMutation } from './builder'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMutateSubComment = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: buildMutation<TCommentResponsePOST, TSubCommentMutationPayload>({
      url: `${BASE_URL}/api/post/comment`,
      method: 'POST',
    }),
    onSuccess: (data) => {
      client.invalidateQueries(['GET_COMMENTS', data.slug])
    },
  })
}
