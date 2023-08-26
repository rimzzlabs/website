'use client'

import { queryConfig } from '@/queries/client'
import { jotaiStore } from '@/store'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(() => new QueryClient(queryConfig))

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider attribute='class' storageKey='app_theme' enableSystem>
          <JotaiProvider store={jotaiStore}>{children}</JotaiProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
