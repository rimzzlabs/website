import { ArticleHeadProps } from '@/data/articles/articleType'
import PageLayout from '@/layouts/PageLayout'
import { getAllArticle, getArticle } from '@/libs/mdx'

import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'

interface slugProp extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllArticle()
  const paths = res.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = ctx.params as slugProp

  const res = await getArticle(`/${slug}`)

  const mdxSource = await serialize(res.content, {
    mdxOptions: {
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      mdxSource,
      frontMatter: res.data as ArticleHeadProps
    }
  }
}

const ArticleDetailPage: NextPage<{
  mdxSource: MDXRemoteSerializeResult
  frontMatter: ArticleHeadProps
}> = ({ frontMatter, mdxSource }) => {
  return (
    <PageLayout
      title={frontMatter.title}
      description={frontMatter.summary}
      openGraph={{
        article: {
          authors: ['Rizki Maulana Citra'],
          tags: frontMatter.topics,
          publishedTime: new Date(frontMatter.publishedAt).toLocaleDateString('en-EN', {
            dateStyle: 'medium'
          })
        }
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: `${frontMatter.topics[0]}, ${frontMatter.topics[1]}`
        }
      ]}
    >
      <article className={clsx('prose md:prose-base', 'dark:prose-invert')}>
        <header>
          <h1>{frontMatter.title}</h1>
          <div className={clsx('flex items-center justify-between', 'mt-2 md:mt-4')}>
            <div className={clsx('flex items-center space-x-1 md:space-x-2', 'w-full')}>
              {frontMatter.topics.map((item) => {
                const random = Math.floor(Math.random() * 100)
                return (
                  <span
                    key={item}
                    className={clsx(
                      random > 0 && random <= 35
                        ? ' text-ternary-500 dark:text-ternary-400'
                        : random > 35 && random <= 80
                        ? ' text-rose-500 dark:text-rose-400'
                        : ' text-primary-500 dark:text-primary-400'
                    )}
                  >
                    #{item}
                  </span>
                )
              })}
            </div>
            <p className='w-full text-right'>
              Published at{' '}
              {new Date(frontMatter.publishedAt).toLocaleDateString('en-EN', {
                dateStyle: 'medium'
              })}
            </p>
          </div>
        </header>
        <main>
          <MDXRemote {...mdxSource} lazy />
        </main>
      </article>
    </PageLayout>
  )
}

export default ArticleDetailPage
