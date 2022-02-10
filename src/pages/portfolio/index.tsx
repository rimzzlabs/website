import Hero from '@/components/mollecules/Hero'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'
import { getPortfolio } from '@/libs/mdx'

import clsx from 'clsx'
import { NextPage } from 'next'
import React, { useState } from 'react'

export const getStaticProps = async () => {
  const res = await getPortfolio()

  const portfolios = res.map((data) => {
    const date = dateFormat(data.date)
    return { ...data, date }
  })
  return {
    props: {
      portfolios
    }
  }
}

interface ProjectPageProps {
  portfolios: Array<PortfolioHeadProps>
}

const ProjectPage: NextPage<ProjectPageProps> = ({ portfolios = [] }) => {
  const [searchVal, setSearchVal] = useState<string>('')

  const meta = {
    title: 'Portfolio',
    templateTitle: 'Rizki Maulana Citra, Student and Frontend Developer',
    description:
      "List of my personal portfolio, proven that I've created something with my knowledge and experience, and like any other people, I will grow my skill and combine it with experience i have."
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value)

  return (
    <Layout {...meta}>
      <Hero {...meta} />

      <div className='py-10'>
        <div className={clsx('flex items-stretch', 'h-10')}>
          <input
            className={clsx(
              'w-full px-4 text-sm',
              'outline-none bg-transparent rounded',
              'bg-theme-50 border border-theme-300 dark:border-transparent text-theme-700 dark:bg-theme-800 dark:text-theme-200'
            )}
            placeholder='Search portfolios'
            type='text'
            value={searchVal}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-1 gap-4 md:gap-5')}>
        {portfolios.length > 0 &&
          portfolios
            .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
            .map((data, index) => <ProjectCard key={data.title + index} {...data} />)}
      </div>
      <Footer />
    </Layout>
  )
}

export default ProjectPage
