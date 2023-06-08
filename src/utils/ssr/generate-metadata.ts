import { Metadata } from 'next'

type Meta = Metadata & {
  templateTitle?: string
}

export const createMetadata = (meta: Meta) => {
  const title = `${meta.title} — ${meta.templateTitle ?? 'Frontend Developer'}`

  return { ...meta, title }
}
