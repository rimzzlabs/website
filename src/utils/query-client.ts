import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: process.env.NODE_ENV === 'production', // save build and compilation time on development
          refetchOnMount: false,
        },
      },
    }),
)
