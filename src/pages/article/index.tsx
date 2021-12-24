import Footer from '@/components/Footer'
import Meta from '@/components/atoms/Meta'
import { metaPages } from '@/utils/constant'
import clsx from 'clsx'
import AnimeContainer from '@/components/wrapper/AnimeContainer'
import { GetStaticProps } from 'next'
import { doGet } from '@/libs/doFetch'
import ArticleCard from '@/components/cards/ArticleCard'
import { ArticleProps, SingleArticleType } from '@/types/customType'
import readingTime from 'reading-time'

export const getStaticProps: GetStaticProps = async () => {
  const response = await doGet<ArticleProps>('/article?sort=id:DESC')

  const articles = response.result.data.map((item) => {
    const estRead = readingTime(item.attributes.content)
    return { ...item, estRead }
  })

  return {
    props: {
      data: articles
    },
    revalidate: 15
  }
}

type IndexArticlePageProps = {
  data: Array<SingleArticleType>
  articles: Array<SingleArticleType>
}

const IndexArticlePage = ({ data }: IndexArticlePageProps) => {
  return (
    <>
      <Meta {...metaPages.article} />

      <AnimeContainer className='py-20 min-h-screen flex flex-col'>
        <section className='-scroll-mt-80'>
          <h1 className='header-color mb-2 md:mb-4'>My Articles</h1>
          <p className='max-w-3xl'>
            Articles covering Information Technology, Web Development as well as Social Life based on my personal view.
          </p>
        </section>

        <section>
          <AnimeContainer
            list
            delay={0.4}
            className={clsx('grid sm:grid-cols-2', 'w-full flex-[1_1_auto] gap-4 md:gap-8 mt-4 md:mt-8')}
          >
            {data && data.length > 0
              ? data.map((data, idx) => (
                  <li key={idx} className='min-h-[8rem]'>
                    <ArticleCard {...data} />
                  </li>
                ))
              : null}
          </AnimeContainer>
        </section>
      </AnimeContainer>
      <Footer />
    </>
  )
}

export default IndexArticlePage
