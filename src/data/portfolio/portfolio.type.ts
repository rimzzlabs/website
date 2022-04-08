export interface PortfolioHeadProps {
  title: string
  date: string
  featured: boolean
  summary: string
  slug: string
  stack: Array<string>
  image: string
  link: {
    github: string
    live: string
  }
}
