import { useTheme as useAccent } from 'next-themes'
import { useEffect, useState } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

/**
 * useTheme, used to switch between light and dark theme, checkout `src/components/Header.tsx`
 * to see how this hooks being used
 */
const useTheme = () => {
  const { theme, setTheme, systemTheme } = useAccent()
  const [mounted, setMounted] = useState(true)

  const currentTheme = theme === 'system' ? systemTheme : theme

  const changeTheme = () => {
    if (currentTheme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }
  useEffect(() => setMounted(false), [])

  return {
    mounted,
    changeTheme,
    icon: mounted ? null : currentTheme === 'dark' ? <BiSun /> : <BiMoon />
  }
}

export default useTheme
