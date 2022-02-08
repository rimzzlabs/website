import ArticleCard from '@/components/mollecules/ArticleCard'
import Hero from '@/components/mollecules/Hero'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import dateFormat from '@/libs/dateFormat'
import { getArticle } from '@/libs/mdx'

import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'

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
    <Layout title='Article'>
      <Hero
        title='Article'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente laudantium enim perspiciatis similique consequuntur ab. Nostrum repellat id ad harum aut unde dolor laboriosam, dolorum odio tempore.'
        className='mb-2 md:mb-4'
      />

      <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'pt-10 flex-1 gap-4 md:gap-5')}>
        {articles.length > 0 && articles.map((data, index) => <ArticleCard key={data.title + index} {...data} />)}
      </div>
      <Footer />
    </Layout>
  )
}

export default ArticlePage
