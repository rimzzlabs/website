import { useCallback, useEffect, useState } from 'react'

/**
 * This is a custom hook in TypeScript React that checks if a given media query matches and returns a
 * boolean value.
 * @param {string} query - A string representing the media query to be matched. It follows the same
 * syntax as CSS media queries.
 * @returns The `useMediaQuery` custom hook returns a boolean value indicating whether the given media
 * query matches the current viewport or not.
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
