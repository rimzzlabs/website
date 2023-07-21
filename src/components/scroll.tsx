'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// NOTE: Next 13 has bug which is when route change, it doesn't scroll to top, so here's temporary workaround
// THIS MIGHT BE FIXED IN THE FUTURE

/**
 * The Scroll component is a React component that scrolls the window to the top whenever the pathname
 * changes.
 */
export const Scroll = () => {
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return <></>
}
