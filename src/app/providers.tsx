'use client'

import { QUERY_CLIENT } from '@/queries/client'
import { jotaiStore } from '@/store'

import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ThemeProvider attribute='class' storageKey='app_theme' enableSystem>
          <JotaiProvider store={jotaiStore}>{children}</JotaiProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
