import { PortfolioList } from '@/components/content/portfolio/PortfolioList'

import { PortfolioCard } from '@/UI/cards'
import { EmptyResult, Spinner } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents } from '@/services'

import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getNewestPortfolio } from '@/libs/sorters'
import { twclsx } from '@/libs/twclsx'

import { useSearch } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import type { Portfolio } from 'rizkicitra'

type PortfoliopageProps = {
  portfolio: Array<Portfolio>
}

const meta = getMetaPage({
  title: 'Portfolio',
  description: `Personal portfolio, proven that I've created something with my current knowledge and experience.`,
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
  const search = useSearch<PortfoliopageProps['portfolio']>(portfolio, 'portfolio')

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={search.handleChange} value={search.query} />

      <div className={twclsx('flex flex-col gap-8')}>
        {search.query.length === 0 && portfolio.length > 0 ? (
          <PortfolioList portfolios={portfolio} title='Personal Portfolio' />
        ) : null}

        {search.query.length > 0 && (
          <>
            {search.filteredData.length > 0 ? (
              <>
                {search.isPending ? (
                  <Spinner spinnerSize='md' containerSize='full' containerStyle='h-64' />
                ) : (
                  <PortfolioList portfolios={search.filteredData} title='Search Portfolio' />
                )}
              </>
            ) : (
              <EmptyResult />
            )}
          </>
        )}
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
