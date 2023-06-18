import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

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

  return {
    mounted,
    changeTheme,
    theme,
    systemTheme,
  }
}
