import CustomImage from '@/components/atoms/CustomImage'
import Footer from '@/components/organism/Footer'
import MDXComponents from '@/components/organism/MDXComponents'
import Layout from '@/components/templates/Layout'

import { Blogs } from '@/data/blog/blog.type'
import { getBlog, getBlogBySlug } from '@/helpers/getBlog'
import dateFormat, { dateStringToISO } from '@/libs/dateFormat'
import { getMetaDataBlog } from '@/libs/metaData'

import clsx from 'clsx'
import { LayoutProps } from 'framer-motion'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import 'prism-themes/themes/prism-night-owl.css'
import { ParsedUrlQuery } from 'querystring'
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi'
import readingTime from 'reading-time'

const BackToTop = dynamic(() => import('@/components/atoms/BackToTop'))

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  header: Blogs & { views?: number }
}

interface slug extends ParsedUrlQuery {
  slug: string
}

const BlogPost: NextPage<BlogPostProps> = ({ header, mdxSource }) => {
  const metaData = getMetaDataBlog({
    ...header,
    slug: '/blog/' + header.slug
  })

  return (
    <Layout {...(metaData as LayoutProps)}>
      <BackToTop />
      <article className='flex flex-col gap-8'>
        <section className={clsx('pb-8 border-b', 'border-theme-300 dark:border-theme-700')}>
          <h1 className='max-w-prose text-3xl md:text-5xl'>{header.title}</h1>
          <p className='my-8'>{header.summary}</p>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-sm md:text-base'>
              <HiOutlineClock />
              <p>{header.est_read}</p>
            </div>
            {header.views && (
              <div className='flex items-center gap-2 text-sm md:text-base'>
                <HiOutlineEye />
                <p>{header.views} Views</p>
              </div>
            )}
          </div>
        </section>

        <section className='flex flex-col gap-4 mb-24'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <CustomImage
                display='intrinsic'
                className='rounded-full'
                src={header.author_image}
                width={32}
                height={32}
                alt={header.author_name}
              />
              <p>{header.author_name}</p>
            </div>
          </div>

          <p>
            Published on <time dateTime={dateStringToISO(header.published)}>{dateFormat(header.published)}</time>.
          </p>
        </section>

        {header.thumbnail && (
          <figure className='relative w-full h-56 md:h-96'>
            <CustomImage
              quality={100}
              className='rounded-lg'
              display='responsive'
              objectFit='cover'
              alt={header.title}
              src={header.thumbnail}
            />
          </figure>
        )}

        <section className='prose dark:prose-invert md:prose-lg'>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </section>
      </article>
      <Footer />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getBlog()

  const paths = res.map((r) => ({ params: { slug: r.header.slug } })) as GetStaticPathsResult['paths']

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async (ctx) => {
  const mdxPrism = await require('mdx-prism')
  const { slug } = ctx.params as slug

  const res = await getBlogBySlug(slug)
  const est_read = readingTime(res.content).text

  const mdxSource = await serialize(res.content, {
    mdxOptions: { rehypePlugins: [mdxPrism] }
  })

  return {
    props: {
      header: { est_read, ...res.header },
      mdxSource
    }
  }
}

export default BlogPost
