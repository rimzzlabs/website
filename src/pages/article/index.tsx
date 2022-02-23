import ArticleCard from '@/components/mollecules/ArticleCard'
import Hero from '@/components/mollecules/Hero'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import dateFormat from '@/libs/dateFormat'
import { getArticle } from '@/libs/mdx'

import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'

const meta = {
  title: 'Article',
  description:
    'I write articles once in a while, talks about JavaScript, CSS, and React Ecosystem and Web Development related topics, I have no high quality article like what you expect, but somehow I like to share my knowledge and experience throught writing.'
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await getArticle()

  const articles = res
    .sort((a, b) => (new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1))
    .map((data) => {
      const publishedAt = dateFormat(data.publishedAt)
      return {
        ...data,
        publishedAt
      }
    })

  return {
    props: {
      articles
    }
  }
}

const ArticlePage: NextPage<{ articles: Array<ArticleHeadProps> }> = ({ articles = [] }) => {
  return (
    <Layout {...meta}>
      <Hero {...meta} />

      <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'pt-10 flex-1 gap-4 md:gap-5')}>
        {articles.length > 0 && articles.map((data, index) => <ArticleCard key={data.title + index} {...data} />)}
      </div>
      <Footer />
    </Layout>
  )
}

export default ArticlePage
