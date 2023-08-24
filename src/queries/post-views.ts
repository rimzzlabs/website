import { BASE_URL } from '@/utils/env/client'

import { buildQuery } from './builder'

import { useQuery } from '@tanstack/react-query'

export const usePostViews = (params: { initialData: number; slug: string }) => {
  return useQuery({
    queryKey: ['post-views', params.slug],
    queryFn: buildQuery({
      url: `${BASE_URL}/api/post/views`,
      params: { slug: params.slug },
    }),
    initialData: {
      message: '',
      data: {
        slug: params.slug,
        views: params.initialData,
      },
    },
  })
}
