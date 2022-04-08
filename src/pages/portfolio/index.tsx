import Card from '@/components/atoms/Card'
import Hero from '@/components/mollecules/Hero'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Searchbar from '@/components/mollecules/Searchbar'
import Footer from '@/components/organism/Footer'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import dateFormat from '@/libs/dateFormat'
import { getPortfolio } from '@/libs/helpers'

import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'

const meta: LayoutProps = {
  title: 'Portfolio',
  description:
    "List of my personal portfolio, proven that I've created something with my knowledge and experience, and like any other people, I will grow my skill and combine it with experience I have.",
  openGraph: {
    type: 'website'
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        "rizki, maulana, cira, rizkimcitra, rizki m citra, rizkicitra, rizki citra, rizki's portfolio, portfolio, projects, personal portfolio, rizki maulana citra's personal portfolio, rizki maulana citra, personal portfolio"
    },

    {
      name: 'author',
      content: 'Rizki Maulana Citra'
    }
  ]
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await getPortfolio()

  // I don't want to mutate the data directly, so clone first with slice function and then sorted it out, map
  // the data, to add a new property inside the data
  const portfolios =
    res
      .slice()
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
      .map((data) => {
        const date = dateFormat(data.date)

        return { ...data, date }
      }) ?? []

  return {
    props: {
      portfolios
    },
    revalidate: 60
  }
}

interface ProjectPageProps {
  portfolios: Array<PortfolioHeadProps>
}

const ProjectPage: NextPage<ProjectPageProps> = ({ portfolios = [] }) => {
  const [query, setQuery] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const filteredPortfolios = portfolios.filter(
    (data) =>
      data.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      data.summary.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )

  return (
    <Layout {...meta}>
      <Hero title={meta.title} description={meta.description as string} />
      <Searchbar onChange={handleChange} value={query} />

      {portfolios.length > 0 && filteredPortfolios.length > 0 ? (
        <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-1 gap-4 md:gap-5')}>
          {filteredPortfolios.map((data, index) => (
            <Card key={data.title + index}>
              <ProjectCard {...data} />
            </Card>
          ))}
        </div>
      ) : null}

      {filteredPortfolios.length === 0 && (
        <div className='w-full text-center'>
          <p>😞Oops, could not found what you are looking for....</p>
        </div>
      )}
      <Footer />
    </Layout>
  )
}

export default ProjectPage
