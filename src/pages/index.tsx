import Image from '@/components/atoms/Image'
import ArticleCard from '@/components/mollecules/ArticleCard'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Section from '@/components/organism/Section'
import Layout, { LayoutProps } from '@/components/templates/Layout'

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
  const meta: LayoutProps = {
    title: 'Rizki M Citra',
    templateTitle: 'Student and Frontend Developer',
    description:
      "Howdy👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffee, talks about React, Next.js, CSS and Web Development related topics.",
    openGraph: {
      images: [
        {
          url: 'https://ik.imagekit.io/mlnzyx/attachment/profile_NEVpiY6EF.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648893977282',
          alt: 'Rizki Maulana Citra',
          height: 600,
          width: 1200,
          type: 'image/webp'
        }
      ],
      site_name: 'Rizki Maulana Citra',
      url: 'https://rizkicitra.dev',
      type: 'website'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content:
          'rizkicitra, Rizki Citra, rizkicitra, rizkimcitra, Rizki M Citra, Rizki, Maulana, Citra, Citra Dev, Citra, Rizki Maulana Citra, Rizki Maulana, Rizki Github, rizki github, Rizki GitHub, Rizki Nextjs, Personal Website, Frontend, Frontend Dev, Frontend Developer, Developer, Indonesia, Rizki Citra Developer, Rizki Citra Dev, Rizki Dev, Rizki Maulana Citra, rmaulana citra, developer from indonesia, personal website, blog, talks about react, talks about react and nextjs, web development related topics, developer, AMIK Serang'
      },
      {
        name: 'author',
        content: 'Rizki Maulana Citra'
      }
    ]
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
          <div className='relative w-24 md:w-40 h-24 md:h-40'>
            <Image
              title='Rizki Maulana Citra'
              layout='fill'
              alt='Rizki Maulana Citra'
              className='rounded-full'
              src='https://ik.imagekit.io/mlnzyx/attachment/profile_NEVpiY6EF.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648893977282'
              loading='lazy'
              placeholder='blur'
              quality={70}
              blurDataURL='/blur.svg'
            />
          </div>
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
