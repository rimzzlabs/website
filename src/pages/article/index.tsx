// import ArticleCard from '@/components/mollecules/ArticleCard'
import Link from '@/components/atoms/Link'
import Hero from '@/components/mollecules/Hero'
// import Footer from '@/components/organism/Footer'
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

const ArticlePage: NextPage<{ articles: Array<ArticleHeadProps> }> = () => {
  return (
    <Layout title='Article'>
      <Link
        href='/'
        className={clsx(
          'inline-flex mb-2 md:mb-4',
          'text-theme-600 hover:text-theme-800',
          'dark:text-theme-500 dark:hover:text-theme-300'
        )}
      >
        &larr; Back to Home
      </Link>

      <Hero
        title='Under Construction'
        description='This page still in development, sooner or later will be commited to the main branch, you can check this page later😃.'
        className='mb-2 md:mb-4'
      />

      {/* <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'pt-10 flex-1 gap-4 md:gap-5')}>
        {articles.length > 0 && articles.map((data, index) => <ArticleCard key={data.title + index} {...data} />)}
      </div> */}
      {/* <Footer /> */}
    </Layout>
  )
}

export default ArticlePage
