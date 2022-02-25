import MDXComponents from '@/components/MDXComponents'
import Image from '@/components/atoms/Image'
import Footer from '@/components/organism/Footer'
import Layout from '@/components/templates/Layout'

import { ArticleHeadProps } from '@/data/articles/articleType'
import dateFormat from '@/libs/dateFormat'
import { getArticle, getArticleBySlug } from '@/libs/mdx'

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
      frontMatter: {
        ...res.data,
        content: res.content
      },
      mdxSource
    },
    revalidate: 60
  }
}

const ArticleDetailPage: NextPage<ArticleProps> = ({ frontMatter, mdxSource }) => {
  const date = dateFormat(frontMatter.publishedAt)
  const estRead = readingTime(frontMatter.content)
  return (
    <Layout
      title={frontMatter.title}
      openGraph={{
        title: date + ' - ' + frontMatter.title
      }}
      templateTitle='Article'
      description={frontMatter.summary}
      additionalMetaTags={[
        {
          name: 'Author',
          content: frontMatter.author
        }
      ]}
    >
      <BackToTop />
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
                  alt={frontMatter.author}
                  width={28}
                  height={28}
                  placeholder='blur'
                  blurDataURL='/blur.svg'
                  className={clsx('rounded-full')}
                  layout='intrinsic'
                />
              </figure>
              <span>{frontMatter.author}</span>
            </div>
            <span>
              Published on <time>{date}</time>
            </span>
          </div>
        </header>

        <main>
          <MDXRemote {...mdxSource} components={MDXComponents} lazy />
        </main>
      </article>
      <Footer />
    </Layout>
  )
}

export default ArticleDetailPage
