import { SITE_NAME, SITE_URL } from '../constant'

import type { Metadata } from 'next'

type Meta = Metadata & {
  templateTitle?: string
}

export const createMetadata = ({ templateTitle, ...meta }: Meta): Metadata => {
  const title = `${meta.title} — ${templateTitle ?? SITE_NAME}`

  return { ...meta, title, metadataBase: new URL(SITE_URL) }
}
