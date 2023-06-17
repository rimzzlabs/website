import { Metadata } from 'next'

type Meta = Metadata & {
  templateTitle?: string
  canonical?: string
}

export const createMetadata = ({ canonical, templateTitle, ...meta }: Meta): Metadata => {
  const title = `${meta.title} — ${templateTitle ?? 'Frontend Developer'}`

  return { ...meta, title, alternates: { canonical: canonical } }
}
