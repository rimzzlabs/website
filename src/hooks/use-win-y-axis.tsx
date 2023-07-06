import { useCallback, useEffect, useState } from 'react'

export const useWindowYAxis = () => {
  const [pos, setPos] = useState(0)

  const scrollHandler = useCallback(() => {
    const yAxisPos = window.scrollY
    setPos((prevPos) => (yAxisPos === prevPos ? prevPos : yAxisPos))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollHandler)

      return () => window.removeEventListener('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return pos
}
