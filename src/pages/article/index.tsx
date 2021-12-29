import { doGet } from '@/libs/doFetch'
import { ArticleProps, SingleArticleType } from '@/types/customType'
import { metaPages } from '@/utils/constant'

import clsx from 'clsx'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import readingTime from 'reading-time'

const Footer = dynamic(() => import('@/components/Footer'))
const Meta = dynamic(() => import('@/components/atoms/Meta'))
const ArticleCard = dynamic(() => import('@/components/cards/ArticleCard'))
const AnimeContainer = dynamic(() => import('@/components/wrapper/AnimeContainer'))

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
    revalidate: 1
  }
}

type IndexArticlePageProps = {
  data: Array<SingleArticleType>
}

const IndexArticlePage = ({ data }: IndexArticlePageProps) => {
  return (
    <>
      <Meta {...metaPages.article} />

      <AnimeContainer className='py-20 min-h-screen flex flex-col'>
        <section className='-scroll-mt-80'>
          <h1 className='header-color mb-2 md:mb-4'>Articles</h1>
          <p className='max-w-3xl xl:text-lg'>
            I talk about anything that interest me, Web Development, Internet, as well as Social Life based on my
            personal view.
          </p>
        </section>

        <section>
          <h2 className='sr-only'>List of My Articles</h2>
          <AnimeContainer
            list
            delay={0.4}
            className={clsx('grid sm:grid-cols-2', 'w-full flex-[1_1_auto] gap-4 md:gap-8 mt-4 md:mt-8')}
          >
            {data.length > 0 &&
              data.map((data, idx) => (
                <li key={idx} className='min-h-[8rem]'>
                  <ArticleCard {...data} />
                </li>
              ))}
          </AnimeContainer>
        </section>
      </AnimeContainer>
      <Footer />
    </>
  )
}

export default IndexArticlePage
