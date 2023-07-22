import { SITE_NAME, SITE_URL } from '../constant'

import type { Metadata } from 'next'

type Meta = Metadata & {
  templateTitle?: string
  canonical: string
}

export const createMetadata = ({ templateTitle, canonical, ...meta }: Meta): Metadata => {
  const title = `${meta.title} — ${templateTitle ?? SITE_NAME}`
  const canonicalURL = new URL(canonical, SITE_URL)

  return {
    ...meta,
    title,
    alternates: {
      ...meta.alternates,
      canonical: canonicalURL.toString(),
    },
  }
}
