import { PortfolioItem } from './PortfolioItem'

import { Portfolio } from 'rizkicitra'

type PortfolioListProps = {
  title: string
  portfolios: Portfolio[]
}

export const PortfolioList: React.FunctionComponent<PortfolioListProps> = (props) => {
  return (
    <section className='py-8 md:py-16'>
      <h2 className='mb-5 md:mb-7'>{props.title}</h2>

      {props.portfolios.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 flex-auto'>
          {props.portfolios.map((item) => {
            return <PortfolioItem key={item.slug} {...item} />
          })}
        </div>
      )}
    </section>
  )
}
