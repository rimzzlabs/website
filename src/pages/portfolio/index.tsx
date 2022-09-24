import { PortfolioCard } from '@/UI/cards'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getContents } from '@/services'

import { getMetaData } from '@/libs/metaData'
import { generateOgImage } from '@/libs/ogImage'
import { getNewestPortfolio } from '@/libs/sortPortfolio'
import { twclsx } from '@/libs/twclsx'

import { useSearch } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import type { Portfolio } from 'rizkicitra'

// const PortfolioCard = dynamic(() => import('@/UI/cards').then((m) => ({ default: m.PortfolioCard })), {
//   suspense: true
// })

type PortfoliopageProps = {
  portfolio: Array<Portfolio>
}

const meta = getMetaData({
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
  const { query, handleChange, filteredData } = useSearch<PortfoliopageProps['portfolio']>(portfolio, 'portfolio')

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={handleChange} value={query} />

      <div className={twclsx('flex flex-col gap-8')}>
        {query.length === 0 && portfolio.length > 0 ? (
          <section>
            <h2 className={twclsx('mb-4')}>Personal Portfolio</h2>

            {/* <Suspense fallback={<Spinner containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
                {portfolio.map((p) => (
                  <PortfolioCard key={p.slug} {...p} />
                ))}
              </div>
            </Suspense> */}
            <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
              {portfolio.map((p) => (
                <PortfolioCard key={p.slug} {...p} />
              ))}
            </div>
          </section>
        ) : null}

        {query.length > 0 && (
          <section>
            <h2 className={twclsx('mb-4')}>Search Portfolio</h2>
            {filteredData.length > 0 ? (
              // <Suspense fallback={<Spinner containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              //   <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
              //     {filteredData.map((p) => (
              //       <PortfolioCard key={p.slug} {...p} />
              //     ))}
              //   </div>
              // </Suspense>
              <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
                {filteredData.map((p) => (
                  <PortfolioCard key={p.slug} {...p} />
                ))}
              </div>
            ) : (
              <p>No portfolio found, try a lil different?</p>
            )}
          </section>
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
