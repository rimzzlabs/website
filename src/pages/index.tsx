import { BlogCard, PortfolioCard } from '@/UI/cards'
import { HeroWithPhoto, LayoutPage, Section } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { GetContents, getContents } from '@/services'

import { getMetaPage } from '@/libs/metapage'
import { getNewestBlog, getNewestPortfolio } from '@/libs/sorters'

import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { GetStaticProps, NextPage } from 'next'
import readingTime from 'reading-time'
import type { Blog, Portfolio } from 'rizkicitra'

interface HomePageProps {
  blogs: Array<Blog>
  portfolios: Array<Portfolio>
}

const parentV: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
}

const toUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
}

const HomePage: NextPage<HomePageProps> = ({ blogs, portfolios }) => {
  const meta = getMetaPage({
    title: 'Rizki Maulana Citra',
    template: 'Student And Frontend Developer',
    description: `Personal Website, Online Portfolio And Blog, Built On Top Of NEXT.js, An Online Space For Rizki To Share His Knowledge And Experience.`,
    keywords: ['Rizki Maulana Citra', 'Rizki M Citra', 'Rizkicitra', 'Rizki Citra', 'rizkicitra.dev'],
    og_image: `https://ik.imagekit.io/mlnzyx/tr:w-${712},h-${712},tr:bl-10,f-auto/attachment/profile.webp?updatedAt=1657210611675`,
    og_image_alt: 'Rizki Maulana Citra',
    slug: '/',
    type: 'website'
  })
  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
      <m.div variants={parentV}>
        <HeroWithPhoto
          title={meta.title as string}
          subtitle='Student &amp; Frontend Developer'
          description="Hello👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffee. Welcome to my personal website, where you can find my portfolio, blog and more."
          img={{
            alt_title: meta.title as string,
            src: meta?.openGraph?.images ? meta.openGraph.images[0].url : ''
          }}
        />

        <m.div variants={toUp}>
          <Section
            title='Featured Post'
            gridCols='grid-cols-1 md:grid-cols-2'
            data={blogs}
            Component={BlogCard}
            link={{
              to: '/blog',
              children: 'See all post'
            }}
          />
        </m.div>

        <m.div variants={toUp}>
          <Section
            title='Featured Portfolio'
            gridCols='grid-cols-1 md:grid-cols-2'
            data={portfolios}
            Component={PortfolioCard}
            link={{
              to: '/portfolio',
              children: 'See all portfolio'
            }}
          />
        </m.div>
      </m.div>
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [requestBlogs, requestPortfolios] = await Promise.allSettled([
    getContents<Blog>('/blog'),
    getContents<Portfolio>('/portfolio')
  ])

  const blogsData = [] as Array<GetContents<Blog>>
  const portfoliosData = [] as Array<GetContents<Portfolio>>
  // const portfoliosData = [] as Array<Portfolio>

  if (requestBlogs.status === 'fulfilled') {
    requestBlogs.value.forEach((blog) => {
      blogsData.push(blog)
    })
  }
  if (requestPortfolios.status === 'fulfilled') {
    requestPortfolios.value.forEach((portfolio) => {
      portfoliosData.push(portfolio)
    })
  }

  const blogs = blogsData
    .filter((r) => r.header.featured)
    .map((r) => ({ est_read: readingTime(r.content).text, ...r.header }))
    .sort(getNewestBlog)

  const portfolios = portfoliosData
    .map((p) => p.header)
    .filter((f) => f.featured)
    .sort(getNewestPortfolio)

  return {
    props: {
      blogs,
      portfolios
    }
  }
}

export default HomePage
