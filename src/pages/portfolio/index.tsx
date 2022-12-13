import { PortfolioList } from '@/components/content/portfolio/PortfolioList'

import { EmptyResult } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents } from '@/services'

import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getNewestPortfolio } from '@/libs/sorters'
import { twclsx } from '@/libs/twclsx'

import { useSearchPortfolio } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import type { Portfolio } from 'rizkicitra'

type PortfoliopageProps = {
  portfolio: Array<Portfolio>
}

const meta = getMetaPage({
  title: 'Portfolio',
  description: `A selection of my personal works. I've included samples to showcase my skills and experience. Take a look around and let me know what you think. I'm always open to feedback and opportunities to collaborate.`,
  keywords: [
    'Rizki Maulana Citra portfolio',
    'Rizki M Citra portfolio',
    'Rizkicitra porfolio',
    'Rizki Citra portfolio',
    'rizkicitra.dev'
  ],
  og_image: generateOgImage({ title: 'Portfolio - rizkicitra.dev', subTitle: 'Take a look at my personal portfolio' }),
  og_image_alt: 'Portfolio — rizkicitra.dev',
  slug: '/portfolio',
  type: 'website'
})

const ProjectPage: NextPage<PortfoliopageProps> = ({ portfolio }) => {
  const search = useSearchPortfolio(portfolio)

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={search.handleChange} value={search.query} />

      <div className={twclsx('flex flex-col gap-8')}>
        {search.query === '' && portfolio.length > 0 && (
          <PortfolioList
            description="I've put together a portfolio of my personal work, mostly from my junior years. You're welcome to take a look and explore. Some of the portfolios even have website demos that you can try out if you'd like."
            portfolios={portfolio}
            title='Personal Portfolio'
          />
        )}

        {search.query !== '' && search.filteredPortfolio.length > 0 && (
          <PortfolioList
            description="I've found some possible results for your search."
            portfolios={search.filteredPortfolio}
            title='Search Portfolio'
          />
        )}

        {search.query !== '' && search.filteredPortfolio.length === 0 && <EmptyResult />}
      </div>
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<PortfoliopageProps> = async () => {
  const response = await getContents<Portfolio>('/portfolio')

  const portfolio = response.map((d) => d.header).sort(getNewestPortfolio)

  return {
    props: {
      portfolio: portfolio
    }
  }
}

export default ProjectPage
