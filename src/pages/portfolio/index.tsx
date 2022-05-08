import Card from '@/components/atoms/Card'
import Hero from '@/components/mollecules/Hero'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Searchbar from '@/components/mollecules/Searchbar'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import getPortfolio from '@/helpers/getPortfolio'
import useSearch from '@/hooks/useSearch'
import { getMetaData } from '@/libs/metaData'
import { getNewestPortfolio } from '@/libs/sortPortfolio'
import { twclsx } from '@/libs/twclsx'

import { GetStaticProps, NextPage } from 'next'

interface ProjectPageProps {
  projects: Array<PortfolioHeadProps>
}

const meta = getMetaData({
  title: 'Portfolio',
  description: `Personal portfolio, proven that I've created something with my knowledge and experience, I will grow my skill and combine it with experience I have.`,
  keywords: [
    'Rizki Maulana Citra portfolio',
    'Rizki M Citra portfolio',
    'Rizkicitra porfolio',
    'Rizki Citra portfolio',
    'rizkicitra.dev'
  ],
  og_image: `https://og-image.vercel.app/**Portfolio%20%E2%80%94%20Rizki%20M%20Citra**%3Cbr%20%20%2F%3EProof%20Of%20Work.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg`,
  og_image_alt: 'Portfolio — Rizki M Citra',
  slug: '/portfolio',
  type: 'website'
})

const ProjectPage: NextPage<ProjectPageProps> = ({ projects }) => {
  const { query, handleChange, filteredData } = useSearch<ProjectPageProps['projects']>(projects, 'portfolio')

  return (
    <Layout {...(meta as LayoutProps)}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={handleChange} value={query} />

      <div className={twclsx('flex flex-col gap-8')}>
        {query.length === 0 && projects.length > 0 ? (
          <section>
            <h2 className={twclsx('mb-4')}>Personal Portfolio</h2>

            <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
              {projects.map((p) => (
                <Card key={p.title}>
                  <ProjectCard {...p} />
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {query.length > 0 && (
          <section>
            <h2 className={twclsx('mb-4')}>Search Portfolio</h2>
            {filteredData.length > 0 ? (
              <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
                {filteredData.map((p) => (
                  <Card key={p.title}>
                    <ProjectCard {...p} />
                  </Card>
                ))}
              </div>
            ) : (
              <p>No portfolio found, try a lil different?</p>
            )}
          </section>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<ProjectPageProps> = async () => {
  const response = await getPortfolio()

  const projects = response.sort(getNewestPortfolio)

  return {
    props: {
      projects
    }
  }
}

export default ProjectPage
