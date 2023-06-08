'use client'

import { usePathname } from 'next/navigation'

export const PatternBanner = () => {
  const pathname = usePathname()

  if (pathname !== '/') return null

  return <div className='w-full h-40 md:max-w-2xl mx-auto pattern' />
}
