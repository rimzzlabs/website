export type PortfolioFrontMatter = {
  title: string
  description: string
  created_at: string
  featured: boolean
  stack: string[]
  link: {
    github: string
    live?: string
  }
}
