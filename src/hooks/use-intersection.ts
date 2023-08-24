import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

export const useIntersection = <E extends HTMLElement>(ref: RefObject<E>) => {
  const [isIntersected, setIsIntersected] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersected(true)
        }
      })
    })

    obs.observe(ref.current)

    return () => obs.disconnect()
  }, [ref])

  return isIntersected
}
