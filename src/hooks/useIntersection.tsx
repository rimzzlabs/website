/**
 * custom hook useIntersection to observe element, accept 2 params, ref element and config object
 * this function then return the boolean of isIntersect
 */

import { useState, useEffect } from 'react'

type useIntersectionType = (
  ref: React.RefObject<HTMLElement>,
  config?: IntersectionObserverInit
) => { inView: boolean; ref: React.RefObject<HTMLElement> }

const initialConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const useIntersection: useIntersectionType = (ref, config = initialConfig) => {
  const [inView, setInView] = useState<boolean>(false)

  useEffect(() => {
    //   check if window is available
    if (typeof window === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      setInView(entries[0].isIntersecting)
    }, config)
    if (ref.current) {
      io.observe(ref.current)
    }
  }, [ref, config])

  return {
    inView,
    ref
  }
}

export default useIntersection
