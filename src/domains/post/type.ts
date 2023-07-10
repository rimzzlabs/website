import { type ReadTimeResults } from 'reading-time'

export type PostTag =
  | 'personal branding'
  | 'next.js'
  | 'react.js'
  | 'jotai'
  | 'user experience'
  | 'dev experience'
  | 'personal growth'

export type PostFrontMatter = {
  slug: string
  title: string
  description: string
  publishedAt: string
  modifiedAt?: string
  tags: PostTag[]
  keywords: string[]
  recommendations?: string[]
  est_read?: ReadTimeResults
}
