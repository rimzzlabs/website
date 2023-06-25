import { type ReadTimeResults } from 'reading-time'

export type PostFrontMatter = {
  slug: string
  title: string
  description: string
  publishedAt: string
  modifiedAt?: string
  tags: string[]
  keywords: string[]
  recommendations?: string[]
  est_read?: ReadTimeResults
}
