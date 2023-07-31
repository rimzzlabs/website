'use client'

import { UMAMI_SRC, UMAMI_WEBSITE_ID } from '@/domains/umami'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { P, match } from 'ts-pattern'



export const UmamiScript = () => {
  const crawlerAgent =
    /bot|google|aolbuild|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|Chrome-Lighthouse/i

  const [userAgent, setUserAgent] = useState('default')

  const props = {
    'data-website-id': UMAMI_WEBSITE_ID,
    src: UMAMI_SRC,
  }
  const isDev = process.env.NODE_ENV === 'development'
  const isBot = crawlerAgent.test(userAgent)
  const matcher = {
    isDev,
    isBot,
    userAgent,
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserAgent(navigator.userAgent)
    }
  }, [])

  return match(matcher)
    .with({ isBot: false, isDev: false, userAgent: P.not('default') }, () => (
      <Script async defer id='umami-analytics' strategy='afterInteractive' {...props} />
    ))
    .otherwise(() => null)
}
