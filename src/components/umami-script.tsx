import { UMAMI_SRC, UMAMI_WEBSITE_ID } from '@/utils/env/client'

import Script from 'next/script'

export const UmamiScript = () => {
  const props = {
    'data-website-id': UMAMI_WEBSITE_ID,
    src: UMAMI_SRC,
  }
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) return null
  return <Script async defer id='umami-analytics' strategy='afterInteractive' {...props} />
}
