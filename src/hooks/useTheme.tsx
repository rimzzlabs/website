import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme(),
    [mounted, setMounted] = useState<boolean>(false),
    currentTheme = theme === 'system' ? systemTheme : theme

  const changeTheme = () => {
    if (currentTheme === 'dark') {
      setTheme('light')
      return
    }
    setTheme('dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    mounted,
    changeTheme,
    theme
  }
}

export default useTheme
