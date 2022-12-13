import { PortfolioItem } from './PortfolioItem'

import { Portfolio } from 'rizkicitra'

type PortfolioListProps = {
  title: string
  portfolios: Portfolio[]
  description: string
}

export const PortfolioList: React.FunctionComponent<PortfolioListProps> = (props) => {
  return (
    <section className='py-16'>
      <h2 className='mb-1 md:mb-3'>{props.title}</h2>
      <p className='mb-6 md:mb-8'>{props.description}</p>

      {props.portfolios.length > 0 && (
        <div className='grid md:grid-cols-2 gap-5'>
          {props.portfolios.map((item) => {
            return <PortfolioItem key={item.slug} {...item} />
          })}
        </div>
      )}
    </section>
  )
}
