'use client'

import { UMAMI_SRC, UMAMI_WEBSITE_ID } from '@/domains/umami'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export const UmamiScript = () => {
  const crawlerAgent = /bot|Lighthouse|lighthouse/i

  const [userAgent, setUserAgent] = useState('chrome')

  const props = {
    'data-website-id': UMAMI_WEBSITE_ID,
    src: UMAMI_SRC,
  }
  const isDev = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserAgent(navigator.userAgent)
    }
  }, [])

  if (crawlerAgent.test(userAgent) || isDev) return null

  return <Script async defer id='umami-analytics' strategy='afterInteractive' {...props} />
}
