import { useEffect, useState } from 'react'

/**
 *
 * @param query - a string of media query.
 * @example ```tsx
 * const isMedium = useMediaQuery('(min-width: 768px')
 * ```
 * @returns `true` or `false`
 */
const useMediaQuery = (query: string) => {
  // check if the query is match with the given parameter
  const isMatch = (query: string) => {
    if (typeof window !== 'undefined') {
      // this will return true
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState(false)

  // calllback for media query's event listener
  const handleChange = () => setMatches(isMatch(query))

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

export default useMediaQuery
