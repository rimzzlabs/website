import Image from '@/components/atoms/Image'
import ArticleCard from '@/components/mollecules/ArticleCard'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Section from '@/components/organism/Section'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'
import { getArticle, getPortfolio } from '@/libs/helpers'

import clsx from 'clsx'
import { NextPage } from 'next'

interface HomePageProps {
  portfolios: Array<PortfolioHeadProps>
  articles: Array<ArticleHeadProps>
}

export const getStaticProps = async () => {
  const [resOne, resTwo] = await Promise.all([getPortfolio(), getArticle()])

  const portfolios = resOne
    .filter((data) => data.featured)
    .slice()
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .map((data) => {
      const date = dateFormat(data.date)

      return { ...data, date }
    })

  const articles = resTwo
    .filter((data) => data.featured)
    .slice()
    .sort((a, b) => (new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1))
    .map((data) => {
      const date = dateFormat(data.publishedAt)
      return { ...data, publishedAt: date }
    })

  return {
    props: {
      portfolios,
      articles
    }
  }
}

const HomePage: NextPage<HomePageProps> = ({ portfolios = [], articles = [] }) => {
  const meta = {
    title: 'Rizki Maulana Citra',
    templateTitle: 'Student and Frontend Developer',
    description:
      "Howdy👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffe, talks about React, Next.js, JavaScript, CSS and Web Development related topics."
  }
  return (
    <Layout {...meta}>
      <div
        className={clsx(
          'flex flex-col pb-10 md:pb-20',
          'md:flex-row-reverse md:justify-between md:items-center',
          'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
        )}
      >
        <figure className={clsx('flex items-center md:justify-end self-start', 'mb-4 md:mb-0')}>
          <Image
            width={144}
            height={144}
            layout='intrinsic'
            alt='Rizki Maulana Citra'
            className='rounded-full'
            src='/static/profile.webp'
            loading='lazy'
            placeholder='blur'
            blurDataURL='/blur.svg'
          />
        </figure>
        <section>
          <h1>Rizki M Citra</h1>
          <p
            className={clsx(
              'max-w-max my-3 md:my-4',
              'text-transparent font-bold text-lg md:text-xl',
              'bg-clip-text bg-gradient-to-r',
              'from-primary-500 to-ternary-500'
            )}
          >
            Student &amp; Frontend Developer
          </p>
          <p className='max-w-prose mb-2 md:mb-4'>{meta.description}</p>
        </section>
      </div>

      <Section
        title='Featured Portfolio'
        Component={ProjectCard}
        data={portfolios}
        link={{
          children: 'All portfolios',
          to: '/portfolio'
        }}
        gridCols='grid-cols-1 md:grid-cols-2'
      />

      <Section
        title='Featured Article'
        Component={ArticleCard}
        data={articles}
        link={{
          children: 'Read all article',
          to: '/article'
        }}
      />

      <Footer />
    </Layout>
  )
}

export default HomePage
