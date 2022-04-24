import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'

export const getNewestPortfolio = (a: PortfolioHeadProps, b: PortfolioHeadProps) => {
  return new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0
}
