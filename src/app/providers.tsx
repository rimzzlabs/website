'use client'

import { QUERY_CLIENT } from '@/domains/queries/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider attribute='class' storageKey='app_theme' enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
