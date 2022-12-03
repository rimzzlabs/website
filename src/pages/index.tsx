import { SocialHome } from '@/components/UI/common'
import { BlogList } from '@/components/content'
import { PortfolioList } from '@/components/content/portfolio/PortfolioList'

import { PortfolioCard } from '@/UI/cards'
import { CustomImage } from '@/UI/images'
import { LayoutPage, Section } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { GetContents, getContents } from '@/services'

import { twclsx } from '@/libs'
import { getMetaPage } from '@/libs/metapage'
import { getNewestBlog, getNewestPortfolio } from '@/libs/sorters'

import type { GetStaticProps, NextPage } from 'next'
import readingTime from 'reading-time'
import type { Blog, Portfolio } from 'rizkicitra'

interface HomePageProps {
  blogs: Array<Blog>
  portfolios: Array<Portfolio>
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
      <section className='flex flex-col md:flex-row-reverse'>
        <figure className='relative z-[1] mb-6 md:mb-0 md:ml-6 max-w-max before:z-[-1] before:absolute md:before:hidden before:-inset-1 before:rounded-full before:bg-primary-500'>
          <CustomImage
            display='intrinsic'
            src='https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp'
            alt='Rizki Maulana Citra'
            width={176}
            height={176}
            quality={100}
            loading='eager'
            className='rounded-full md:rounded-md'
            priority
          />
        </figure>

        <div>
          <h1>Rizki Maulana Citra</h1>
          <p
            className={twclsx(
              'max-w-max mt-2 mb-4',
              'text-transparent font-bold text-xl md:text-2xl',
              'bg-clip-text bg-gradient-to-r',
              'from-primary-500 to-ternary-500'
            )}
          >
            Student &amp; Frontend Developer
          </p>
          <p className='mb-2 md:mb-4 max-w-prose'>
            Hello👋, I&apos;m Rizki Maulana Citra, a guy who loves to code, music and coffee. Welcome to my personal
            website, where you can find my portfolio, blog and more.
          </p>

          <SocialHome />
        </div>
      </section>

      <section className='py-10 md:py-20 [&>*:not(:last-child)]:mb-2 md:[&>*:not(:last-child)]:mb-2'>
        <h2>About Me</h2>
        <p>
          A computer science student, frontend developer and an adventurer of my own mind. I like to express my feelings
          through code, and a quite place would be nice to have around me.
        </p>

        <p>
          I choose Information Technology as my main prospect career path, therefore I&apos;m facing many obstacles and
          it was quite challenging.
        </p>

        <p>
          I start learning <strong>Web Development</strong> in <strong>early 2021</strong>, but before that happens,
          I&apos;ve actually learned the basics about <strong>Software Engineering</strong> in{' '}
          <strong>High School</strong>, when I was at 12th grade. I&apos;m focusing on{' '}
          <strong>Frontend Development</strong>, including <strong>Mobile App Development.</strong>
        </p>

        <p>
          On this website, I like to share my various thoughts, including <strong>web development</strong>, and showcase
          my <strong>personal portfolio.</strong>
        </p>
      </section>

      <BlogList posts={blogs} title='Featured Post' />

      <PortfolioList title='Featured Portfolio' portfolios={portfolios} />
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
