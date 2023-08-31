import { BASE_URL } from '@/utils/env/client'

import type { TGuestbook, TGuestbookPayload, TGuestbookResponse } from '@/types/guestbook'

import { buildDeleteMutation, buildMutation, buildQuery } from './builder'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const API_URL = `${BASE_URL}/api/guestbook`

export const useGuestbook = (initialData: TGuestbook[]) => {
  return useQuery({
    queryKey: ['GET_GUESTBOOK'],
    queryFn: buildQuery<TGuestbookResponse>({ url: API_URL }),
    initialData: {
      message: '',
      data: initialData,
    },
  })
}

export const useMutateGuestbook = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: buildMutation<unknown, TGuestbookPayload>({
      method: 'POST',
      url: API_URL,
    }),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['GET_GUESTBOOK'],
      })
    },
  })
}

export const useDeleteGuestbook = (params: { guestbookId: string }) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: buildDeleteMutation({ url: API_URL, params }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ['GET_GUESTBOOK'] })
    },
  })
}
