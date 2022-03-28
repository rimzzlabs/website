import IconFinder from '@/components/atoms/IconFinder'
import Footer from '@/components/organism/Footer'
import MDXComponents from '@/components/organism/MDXComponents'
import ContentImage from '@/components/organism/MDXComponents/ContentImage'
import ContentLink from '@/components/organism/MDXComponents/ContentLink'
import Layout from '@/components/templates/Layout'

import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import dateFormat from '@/libs/dateFormat'
import { getPortfolio, getPortfolioBySlug } from '@/libs/helpers'

import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'

const BackToTop = dynamic(() => import('@/components/atoms/BackToTop'))

interface slugProp extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getPortfolio()
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

  const res = await getPortfolioBySlug(`/${slug}`)

  const mdxSource = await serialize(res.content, {
    mdxOptions: {
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      mdxSource,
      frontMatter: res.data as PortfolioHeadProps
    }
  }
}

interface ProjectDetailPageProps {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: PortfolioHeadProps
}
const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({ frontMatter, mdxSource }) => {
  return (
    <Layout
      title={frontMatter.title}
      description={frontMatter.summary}
      templateTitle={frontMatter.summary}
      openGraph={{
        title: `${dateFormat(frontMatter.date)} - ${frontMatter.title}`,
        article: {
          authors: ['Rizki Maulana Citra'],
          tags: frontMatter.stack,
          publishedTime: dateFormat(frontMatter.date)
        }
      }}
    >
      <BackToTop />

      <article
        className={clsx(
          'prose md:prose-base',
          'dark:prose-invert',
          'prose-code:font-extralight prose-code:text-theme-200'
        )}
      >
        <header
          className={clsx(
            'flex flex-col md:flex-row items-center justify-between',
            'border-b border-theme-300 dark:border-theme-800'
          )}
        >
          <section className='w-full'>
            <h1 style={{ margin: 0 }}>{frontMatter.title}</h1>
            <p>{frontMatter.summary}</p>
          </section>
          <p className='w-full text-sm md:text-right self-end md:text-base'>{dateFormat(frontMatter.date)}</p>
        </header>
        <div className='flex items-center space-x-2 md:space-x-3 pt-6'>
          {frontMatter.stack.length > 0 &&
            frontMatter.stack.map((data, index) => (
              <IconFinder className='text-xl md:text-2xl' key={data + index} type={data} />
            ))}
        </div>
        <main>
          <figure className='relative w-full aspect-video'>
            <ContentImage src={frontMatter.image} alt={frontMatter.title} title={frontMatter.title} />
          </figure>
          <MDXRemote {...mdxSource} components={MDXComponents} lazy />
          <div>
            <h2>Live Site and GitHub Repository</h2>
            <p>
              If you are interested either to see the source code or just the deployed app, please look forward to the
              following links:
            </p>
            {frontMatter.link && (
              <ul>
                {frontMatter.link.github ? (
                  <li>
                    <ContentLink href={frontMatter.link.github}>GitHub repository</ContentLink>
                  </li>
                ) : (
                  <li>Link Unavailable</li>
                )}
                {frontMatter.link.live ? (
                  <li>
                    <ContentLink href={frontMatter.link.live}>Live site</ContentLink>
                  </li>
                ) : (
                  <li>Link Unavailable</li>
                )}
              </ul>
            )}
          </div>
        </main>
      </article>
      <Footer />
    </Layout>
  )
}

export default ProjectDetailPage
