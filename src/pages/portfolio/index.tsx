import Hero from '@/components/mollecules/Hero'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'
import { getPortfolio } from '@/libs/mdx'

import clsx from 'clsx'
import { NextPage } from 'next'

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
  const meta = {
    title: 'Portfolio',
    templateTitle: 'Rizki Maulana Citra, Student and Frontend Developer',
    description:
      "List of my personal portfolio, proven that I've created something with my knowledge and experience, and like any other people, I will grow my skill and combine it with experience i have."
  }

  return (
    <Layout {...meta}>
      <Hero {...meta} />

      <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-1 gap-4 md:gap-5', 'pt-10 md:pt-20')}>
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
