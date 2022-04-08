import Card from '@/components/atoms/Card'
import Image from '@/components/atoms/Image'
import ArticleCard from '@/components/mollecules/ArticleCard'
import Footer from '@/components/organism/Footer'
import MDXComponents from '@/components/organism/MDXComponents'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/article.type'
import dateFormat from '@/libs/dateFormat'
import { getArticle, getArticleBySlug } from '@/libs/helpers'

import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import readingTime from 'reading-time'

const BackToTop = dynamic(() => import('@/components/atoms/BackToTop'))

interface articleSlug extends ParsedUrlQuery {
  slug: string
}

interface ArticleProps {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: ArticleHeadProps
  related: ArticleHeadProps[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getArticle()
  const paths = res.map((item) => ({ params: { slug: item.slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = ctx.params as articleSlug
  const articles = await getArticle()
  const res = await getArticleBySlug(slug)
  const related = articles
    .filter((item) => {
      const data = res.data as ArticleHeadProps
      return data.topics.map((topic) => item.topics.includes(topic)).includes(true) && res.data.title !== item.title
    })
    .slice(0, 3)

  const mdxSource = await serialize(res.content, {
    scope: res.data,
    mdxOptions: {
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      frontMatter: {
        ...res.data,
        content: res.content
      },
      mdxSource,
      related
    },
    revalidate: 60
  }
}

const ArticleDetailPage: NextPage<ArticleProps> = ({ frontMatter, mdxSource, related }) => {
  const date = dateFormat(frontMatter.publishedAt)
  const estRead = readingTime(frontMatter.content)

  return (
    <Layout
      title={frontMatter.title}
      templateTitle="Rizkis' Article"
      description={frontMatter.summary}
      openGraph={{
        title: date + ' - ' + frontMatter.title,
        article: {
          authors: [frontMatter.author],
          publishedTime: frontMatter.publishedAt as string,
          tags: frontMatter.topics
        },
        images: [
          {
            width: 1200,
            height: 650,
            url: `https://og-image.vercel.app/${frontMatter.title}.png?theme=dark&md=1&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&width=1200&height=650`,
            alt: frontMatter.title
          }
        ]
      }}
      twitter={{
        cardType: 'summary_large_image'
      }}
      additionalMetaTags={[
        {
          name: 'author',
          content: frontMatter.author
        },
        {
          name: 'keywords',
          content: [...frontMatter.topics, ...frontMatter.keywords].join(',')
        }
      ]}
    >
      <BackToTop />
      <main>
        <article className='prose dark:prose-invert max-w-2xl'>
          <header className='mb-10 md:mb-20'>
            <section className={clsx('border-b', 'border-theme-300 dark:border-theme-700')}>
              <h1>{frontMatter.title}</h1>
              <p>{frontMatter.summary}</p>

              <div className={clsx('flex justify-end', 'w-full text-sm pb-4')}>
                <time>{estRead.text}</time>
              </div>
            </section>
            <div className={clsx('flex flex-col items-start py-8', 'w-full text-sm')}>
              <div className={clsx('flex items-center', 'mb-2 md:mb-4 space-x-4')}>
                <figure className='m-0'>
                  <Image
                    src={frontMatter.author_pfp}
                    title={frontMatter.author}
                    alt={frontMatter.author}
                    width={30}
                    height={30}
                    quality={100}
                    loading='lazy'
                    layout='intrinsic'
                    className={clsx('rounded-full')}
                  />
                </figure>
                <span>{frontMatter.author}</span>
              </div>
              <span>
                Published on <time>{date}</time>
              </span>
            </div>
          </header>

          <section>
            <MDXRemote {...mdxSource} components={MDXComponents} lazy />
          </section>
        </article>

        {related.length > 0 && (
          <section className='my-10 md:my-20'>
            <h2 className='mb-2'>Related</h2>
            <p className='mb-4'>Other articles you might want to read</p>
            <div className={clsx('grid grid-cols-1 md:grid-cols-2', 'flex-auto gap-4 md:gap-6')}>
              {related.map((data, index) => (
                <Card key={data.title + index}>
                  <ArticleCard ogLink {...data} />
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </Layout>
  )
}

export default ArticleDetailPage
