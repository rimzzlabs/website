import MDXComponents from '@/components/MDXComponents'
import Image from '@/components/atoms/Image'
import BlogImage from '@/components/mollecules/BlogImage'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import dateFormat from '@/libs/dateFormat'
import { getArticle, getArticleBySlug } from '@/libs/mdx'

import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'

interface articleSlug extends ParsedUrlQuery {
  slug: string
}

interface ArticleProps {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: ArticleHeadProps
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
  const res = await getArticleBySlug(slug)

  const mdxSource = await serialize(res.content, {
    scope: res.data,
    mdxOptions: {
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      frontMatter: res.data,
      mdxSource
    }
  }
}

const ArticleDetailPage: NextPage<ArticleProps> = ({ frontMatter, mdxSource }) => {
  const date = dateFormat(frontMatter.publishedAt)
  return (
    <Layout
      title={frontMatter.title}
      templateTitle='Article'
      description={frontMatter.summary}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: 'bruh, foo, bar, bizz'
        },
        {
          name: 'Author',
          content: frontMatter.author
        }
      ]}
    >
      <article className='prose dark:prose-invert max-w-2xl'>
        <header>
          <section className={clsx('border-b', 'border-theme-300 dark:border-theme-700')}>
            <h1>{frontMatter.title}</h1>
          </section>
          <div className='flex flex-col md:flex-row'>
            <div className={clsx('flex flex-col', 'items-start', 'w-full text-sm')}>
              <div className={clsx('flex items-center', 'space-x-4')}>
                <figure>
                  <Image
                    src={frontMatter.author_pfp}
                    alt={frontMatter.author}
                    className={clsx('rounded-full')}
                    width={28}
                    height={28}
                    layout='intrinsic'
                    priority
                  />
                </figure>
                <span>{frontMatter.author}</span>
              </div>
              <span role='date'>{date}</span>
            </div>
          </div>
        </header>

        <main>
          {frontMatter.image && <BlogImage src={frontMatter.image} alt='Photo From Unsplsh' />}
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </main>
      </article>
      <Footer />
    </Layout>
  )
}

export default ArticleDetailPage
