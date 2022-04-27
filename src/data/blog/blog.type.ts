export interface Blogs {
  title: string
  slug: string
  summary: string
  featured: boolean
  author_name: string
  author_image: string
  published: string
  topics: Array<string>
  keywords: Array<string>
  related: Array<string>
  views?: number
  est_read?: string
  thumbnail?: string
}
