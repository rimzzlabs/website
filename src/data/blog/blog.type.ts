export interface BlogHeader {
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
}

export interface Blogs extends BlogHeader {
  est_read: string
  thumbnail?: string
}
