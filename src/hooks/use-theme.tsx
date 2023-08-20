import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { P, match } from 'ts-pattern'

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  const changeTheme = useCallback(
    (value: string) => {
      return () => {
        setTheme(value)
      }
    },
    [setTheme],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  type TInput = [typeof theme, typeof systemTheme]

  const actualTheme = match<TInput, 'light' | 'dark'>([theme, systemTheme])
    .with(P.shape(['dark', P._]).or(P.shape(['system', 'dark'])), () => 'dark')
    .with(P.shape(['light', P._]).or(P.shape(['system', 'light'])), () => 'light')
    .otherwise(() => 'light')

  return {
    theme,
    mounted,
    changeTheme,
    systemTheme,
    actualTheme,
  }
}
