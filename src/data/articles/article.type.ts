export interface ArticleHeadProps {
  title: string
  image: string
  content: string
  featured: boolean
  author: string
  author_pfp: string
  summary: string
  publishedAt: string | Date
  slug: string
  topics: Array<string>
  keywords: Array<string>
}
