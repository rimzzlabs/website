import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

/**
 * This is a custom hook that provides functionality for changing and managing themes in a React
 * application.
 */
export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [dropdownIsOpen, setDropdown] = useState<boolean>(false)

  const toggleDropdown = useCallback(() => setDropdown((prev) => (prev ? false : true)), [])
  const closeDropdown = useCallback(() => setDropdown(false), [])

  const changeTheme = useCallback(
    (value: string) => {
      return () => {
        setTheme(value)
        closeDropdown()
      }
    },
    [setTheme, closeDropdown],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    mounted,
    changeTheme,
    theme,
    systemTheme,
    dropdownIsOpen,
    toggleDropdown,
    closeDropdown,
  }
}
