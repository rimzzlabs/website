import { doGet } from '@/libs/doFetch'
import formatDate from '@/libs/formatDate'
import type { ArticleProps, SingleArticleType } from '@/types/customType'

import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
import readingTime from 'reading-time'

const Footer = dynamic(() => import('@/components/Footer'))
const NextImage = dynamic(() => import('@/components/NextImage'))
const Meta = dynamic(() => import('@/components/atoms/Meta'))

interface customParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await doGet<ArticleProps>('/article')
  const paths = res.result?.data.map(({ attributes }) => ({ params: { slug: attributes.slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = context.params as customParams
  const res = await doGet<ArticleProps>(`/article?filters[slug][$eq]=${slug}`)

  /** clone the data, and loop through with map function
   * lets use reading time to predict how long it takes to read selected article
   * then assigne it to object as a new prop
   */
  const article = res.result.data.map((item) => {
    const estRead = readingTime(item.attributes.content)
    return { ...item, estRead }
  })[0]

  /**
   * serialize content from the cms using next-mdx-remote
   * and also use mdxPrism for rehype plugin for syntax highlighting
   */
  const mdxSource = await serialize(article.attributes.content, {
    mdxOptions: {
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      mdxSource,
      data: article
    },
    revalidate: 1
  }
}

type ArticlePageProps = {
  mdxSource: MDXRemoteSerializeResult
  data: SingleArticleType
}

export const ArticlePage = ({ mdxSource, data }: ArticlePageProps) => {
  const { title, image, publishedAt, author, description } = data?.attributes

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const anchors = document.querySelectorAll('.prose a')

      if (anchors.length > 0) {
        anchors.forEach((element) => {
          const href = element.getAttribute('href')
          const anchorClassName =
            'text-primary-500 dark:text-primary-400 animated-underline border-dark-900 dark:border-dark-100'

          element.setAttribute('class', anchorClassName)

          // let's check if the href value does not start with the string of #
          if (!href?.startsWith('#')) {
            // if it is then let's assing attribute target of _blank and rel of noopener noreferrer
            element.setAttribute('target', '_blank')
            element.setAttribute('rel', 'noopener noreferrer')
          }
        })
      }
    }
  }, [])

  return (
    <>
      <Meta
        title={title}
        description={description}
        imageURL={image.src}
        imageALT={`Image from unsplash - ${image.url}`}
        url={`https://rizkicitra.my.id/article/${data.attributes.slug}`}
        keywords='blog, blogs, rizkicitra, article, tech article'
      />
      <div>
        <div className='pt-20'>
          <figure className='relative w-full h-64 md:h-80 xl:h-[26rem]'>
            <NextImage
              layoutFill
              fit='cover'
              alt={`Image from Unsplash by - ${image.author}`}
              src={image.src}
              className='rounded-md'
            />
          </figure>
        </div>
        <section className='py-2 md:py-4 mb-2 md:mb-8'>
          <h1 className='header-color text-3xl md:text-4xl mb-2 md:mb-4'>{title}</h1>
          <div className='flex items-center justify-between'>
            <span className='max-w-[16rem] sm:max-w-full text-xs md:text-sm'>
              Ditulis oleh {author} pada {formatDate(publishedAt)}
            </span>
            <span className='text-xs md:text-sm'>{data.estRead.text}</span>
          </div>
        </section>
        <section className='border-t md:border-t-2 border-dashed border-dark-400 dark:border-dark-600'>
          <article
            className={clsx(
              'prose prose-sm md:prose-base dark:prose-invert py-20',
              'prose-img:rounded prose-img:w-full prose-img:aspect-video prose-img:object-cover',
              'prose-a:no-underline',
              'prose-headings:text-typo-800'
            )}
          >
            <MDXRemote {...mdxSource} />
          </article>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ArticlePage
