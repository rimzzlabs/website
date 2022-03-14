import { useEffect, useState } from 'react'

/**
 * react custom hook `useWindowScroll` will run on side effect to observe
 * the change of the position of the window, the initial value is `0` as from the top
 * This hooks will returns the current scroll position of the window
 * @returns The scroll position of the window.
 */
const useWindowScroll = () => {
  const [scrollPos, setScrollPos] = useState<number>(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollPos(window.scrollY)
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPos
}

export default useWindowScroll
