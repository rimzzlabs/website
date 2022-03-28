import Card from '@/components/atoms/Card'
import ArticleCard from '@/components/mollecules/ArticleCard'
import Hero from '@/components/mollecules/Hero'
import Searchbar from '@/components/mollecules/Searchbar'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import dateFormat from '@/libs/dateFormat'
import { getArticle } from '@/libs/helpers'

import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'

const meta = {
  title: 'Article',
  description:
    'I write article once in a while, talks about React, Next.JS, CSS and Web Development related topics, although I have no high quality article like what you expect, but I like to share my knowledge and experience throught writing.'
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
  const [query, setQuery] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const filteredArticles = articles.filter((data) => {
    return (
      data.topics.includes(query.toLowerCase()) ||
      data.title.toLowerCase().includes(query.toLowerCase()) ||
      data.summary.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <Layout {...meta}>
      <Hero {...meta} />

      <Searchbar onChange={handleChange} value={query} />

      {articles.length > 0 && filteredArticles.length > 0 ? (
        <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-1 gap-4 md:gap-5')}>
          {filteredArticles.map((data, index) => (
            <Card key={data.title + index}>
              <ArticleCard {...data} />
            </Card>
          ))}
        </div>
      ) : null}

      {filteredArticles.length === 0 && (
        <div className='text-center'>
          <p>Couldn&apos;t find it, try something else 😐..</p>
        </div>
      )}

      <Footer />
    </Layout>
  )
}

export default ArticlePage
