import Image from '@/components/atoms/Image'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Section from '@/components/organism/Section'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'
import { getPortfolio } from '@/libs/mdx'

import clsx from 'clsx'
import { NextPage } from 'next'

interface HomePageProps {
  portfolios: Array<PortfolioHeadProps>
  articles: Array<ArticleHeadProps>
}

export const getStaticProps = async () => {
  const portfolioRes = await getPortfolio()

  const portfolios = portfolioRes
    .filter((data) => data.featured)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .map((data) => {
      const date = dateFormat(data.date)

      return { ...data, date }
    })

  return {
    props: {
      portfolios
    }
  }
}

const HomePage: NextPage<HomePageProps> = ({ portfolios = [] }) => {
  const meta = {
    title: 'Rizki Maulana Citra',
    description:
      "Howdy👋, I'm Rizki Maulana Citra JavaScript enthusiast, who loves to code, music and coffe, talks about React, Next.js, JavaScript and CSS"
  }
  return (
    <Layout {...meta}>
      <div
        className={clsx(
          'flex flex-col pb-10 md:pb-20',
          'md:flex-row-reverse md:justify-between md:items-center',
          'space-y-4 md:space-y-0'
        )}
      >
        <figure className={clsx('flex items-center md:justify-end self-start', 'w-full md:w-2/6', 'mb-4 md:mb-0')}>
          <Image
            width={144}
            height={144}
            layout='intrinsic'
            alt='Rizki Maulana Citra'
            className='rounded-full'
            src='/static/profile.webp'
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
          <p className='max-w-prose mb-2 md:mb-4'>
            Howdy👋, I&apos;m Rizki Maulana Citra JavaScript enthusiast, an intovert who loves to code, music and coffe,
            talks about React, Next.js, JavaScript and CSS
          </p>
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
      />

      <Footer />
    </Layout>
  )
}

export default HomePage
