/**
 * useMediaQuery hook
 * used to get the current media query of the browser
 * this custom hook accepts 3 paramters:
 * 1. <query> - the media query to check
 * 2. <whenTrue> - a string of the value size of the media query when the query is true
 * 3. <whenFalse> - a string of the value size of the media query when the query is false
 */
import { useEffect, useState } from 'react'

export const useMediaQuery = (
  query: string
): {
  matches: boolean
} => {
  const MQ = window.matchMedia(query)
  const [match, setMatch] = useState(!!MQ.matches)

  useEffect(() => {
    const handler = () => setMatch(!!MQ.matches)
    MQ.addEventListener('change', handler)

    return () => MQ.removeEventListener('change', handler)
  }, [MQ])

  return {
    matches: match
  }
}

export default useMediaQuery
