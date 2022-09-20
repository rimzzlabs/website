import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme(),
    [mounted, setMounted] = useState<boolean>(false),
    [dropdownIsOpen, setDropdown] = useState<boolean>(false)

  const toggleDropdown = useCallback(() => setDropdown((prev) => (prev ? false : true)), [])
  const closeDropdown = useCallback(() => setDropdown(false), [])

  const changeTheme = useCallback(
    (value: string) => {
      return () => {
        setTheme(value)
        closeDropdown()
      }
    },
    [setTheme, closeDropdown]
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
    closeDropdown
  }
}

export default useTheme
