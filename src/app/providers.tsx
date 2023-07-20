'use client'

import { getQueryClient } from '@/utils/query-client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

export function Providers({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(getQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' storageKey='app_theme' enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
