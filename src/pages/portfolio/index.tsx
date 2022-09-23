import Hero from '@/components/mollecules/Hero'
import { Loading } from '@/components/mollecules/Loading'
import Searchbar from '@/components/mollecules/Searchbar'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { useSearch } from '@/hooks'
import { getMetaData } from '@/libs/metaData'
import { generateOgImage } from '@/libs/ogImage'
import { getNewestPortfolio } from '@/libs/sortPortfolio'
import { twclsx } from '@/libs/twclsx'
import { getContents } from '@/services'

import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Portfolio } from 'rizkicitra'

const ProjectCard = dynamic(() => import('@/components/mollecules/ProjectCard'), { suspense: true })
const Card = dynamic(() => import('@/components/atoms/Card'), { suspense: true })

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
    <Layout {...(meta as LayoutProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={handleChange} value={query} />

      <div className={twclsx('flex flex-col gap-8')}>
        {query.length === 0 && portfolio.length > 0 ? (
          <section>
            <h2 className={twclsx('mb-4')}>Personal Portfolio</h2>

            <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
              <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
                {portfolio.map((p) => (
                  <Card key={p.title}>
                    <ProjectCard {...p} />
                  </Card>
                ))}
              </div>
            </Suspense>
          </section>
        ) : null}

        {query.length > 0 && (
          <section>
            <h2 className={twclsx('mb-4')}>Search Portfolio</h2>
            {filteredData.length > 0 ? (
              <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
                <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
                  {filteredData.map((p) => (
                    <Card key={p.title}>
                      <ProjectCard {...p} />
                    </Card>
                  ))}
                </div>
              </Suspense>
            ) : (
              <p>No portfolio found, try a lil different?</p>
            )}
          </section>
        )}
      </div>
    </Layout>
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
