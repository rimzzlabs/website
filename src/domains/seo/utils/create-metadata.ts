import { SITE_OWNER_ROLE, SITE_URL } from '../constant'

import { Metadata } from 'next'

type Meta = Metadata & {
  templateTitle?: string
  canonical?: string
}

export const createMetadata = ({ canonical, templateTitle, ...meta }: Meta): Metadata => {
  const title = `${meta.title} — ${templateTitle ?? SITE_OWNER_ROLE}`
  const metadataBase = new URL(SITE_URL)

  return { ...meta, title, metadataBase, alternates: { canonical: canonical } }
}
