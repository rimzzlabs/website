import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @param query - a string of media query.
 * @example ```tsx
 * const isMedium = useMediaQuery('(min-width: 768px)')
 * ```
 * @returns `true` or `false`
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  // check if the query is match with the given parameter
  const isMatch = useCallback((query: string) => {
    if (typeof window !== 'undefined') {
      // this will return true
      return window.matchMedia(query).matches
    }
    return false
  }, [])

  // calllback for media query's event listener
  const handleChange = useCallback(() => setMatches(isMatch(query)), [isMatch, query])

  // we run side effect whenever media query has change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query)
      handleChange()
      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}
