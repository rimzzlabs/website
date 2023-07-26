import type { QueryClientConfig } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: process.env.NODE_ENV === 'production', // save build and compilation time on development
    },
  },
}

export const QUERY_CLIENT = new QueryClient(QUERY_CONFIG)
