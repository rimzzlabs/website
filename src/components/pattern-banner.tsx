'use client'

import { usePathname } from 'next/navigation'

export const PatternBanner = () => {
  const pathname = usePathname()

  if (pathname !== '/') return null

  return <div className='md:layout h-40 pattern' />
}
