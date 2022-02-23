import Hero from '@/components/mollecules/Hero'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'

import axios from 'axios'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

const meta = {
  title: 'Portfolio',
  description:
    "List of my personal portfolio, proven that I've created something with my knowledge and experience, and like any other people, I will grow my skill and combine it with experience i have."
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<{ data: Array<PortfolioHeadProps> }>('http://localhost:3000/api/portfolio')

  const portfolios =
    data.data.map((data) => {
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
      <Hero {...meta} />
      <div
        className={clsx(
          'w-full my-10 md:my-16 rounded transition-all',
          'bg-transparent border border-theme-300',
          'dark:border-transparent dark:bg-theme-800',
          'focus-within:ring ring-primary-500 dark:ring-primary-400'
        )}
      >
        <div className='flex items-center'>
          <HiOutlineSearch className='w-12' />
          <input
            onChange={handleChange}
            value={query}
            type='text'
            placeholder='Search...'
            className={clsx('w-full h-12 text-sm', 'bg-transparent outline-none')}
          />
        </div>
      </div>

      {portfolios.length > 0 && filteredPortfolios.length > 0 ? (
        <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-1 gap-4 md:gap-5')}>
          {filteredPortfolios.map((data, index) => (
            <ProjectCard key={data.title + index} {...data} />
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
