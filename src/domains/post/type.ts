import { type ReadTimeResults } from 'reading-time'

export type PostTag = string

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

export type PostFrontMatterWithViews = PostFrontMatter & {
  views: number
}
