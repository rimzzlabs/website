import { PortfolioFrontMatter } from '@/portfolio/contents/type'

export const PortfolioCard = (props: PortfolioFrontMatter) => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  )
}
