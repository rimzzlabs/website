import { SITE_URL } from '@/domains/seo'

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: SITE_URL + '/sitemap.xml',
    host: SITE_URL,
  }
}
