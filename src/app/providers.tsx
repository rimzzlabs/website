'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute='class' storageKey='app_theme' enableSystem>
      {children}
    </ThemeProvider>
  )
}
