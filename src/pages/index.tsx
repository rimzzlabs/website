import ArticleCard from '@/components/mollecules/ArticleCard'
import HeroWithPhoto from '@/components/mollecules/HeroWithPhoto'
import ProjectCard from '@/components/mollecules/ProjectCard'
import Footer from '@/components/organism/Footer'
import Section from '@/components/organism/Section'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/article.type'
import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import dateFormat from '@/libs/dateFormat'
import { getArticle, getPortfolio } from '@/libs/helpers'

import { NextPage } from 'next'

interface HomePageProps {
  portfolios: Array<PortfolioHeadProps>
  articles: Array<ArticleHeadProps>
}

export const getStaticProps = async () => {
  const [resOne, resTwo] = await Promise.all([getPortfolio(), getArticle()])

  const portfolios = resOne
    .filter((data) => data.featured)
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
    title: 'Rizki Maulana Citra',
    templateTitle: 'Student and Frontend Developer',
    description:
      "Howdy👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffee, talks about React, CSS and Web Development related topics.",
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
      url: 'https://rizkicitra.dev'
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
      <HeroWithPhoto
        title={meta.title}
        subtitle='Student &amp; Frontend Developer'
        description={meta.description as string}
        img={{
          alt_title: meta.title,
          src: meta.openGraph?.images ? meta.openGraph.images[0].url : ''
        }}
      />

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
