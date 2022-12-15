import { CustomSeo } from '@/components'
import { BlogList, ContentImage, PortfolioList } from '@/components/content'

import { Footer, SocialHome } from '@/UI/common'

import { GetContents, getContents } from '@/services'

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
    og_image: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp`,
    og_image_alt: 'Rizki Maulana Citra',
    slug: '/',
    type: 'website'
  })
  return (
    <>
      <CustomSeo {...meta} />

      <div className='w-full h-40 md:layout pattern' />

      <main className='layout'>
        <section className='flex flex-col'>
          <div className='relative flex h-14 md:h-16'>
            <ContentImage
              src='https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp'
              alt='Rizki Maulana Citra'
              width={128}
              height={128}
              className='rounded-full absolute left-1 bottom-0.5 border-4 cursor-pointer border-theme-50 dark:border-theme-900'
              title="Rizki Citra's Face"
              quality={100}
              priority
            />
            <SocialHome className='ml-auto max-w-max' />
          </div>

          <div className='mt-3 md:mt-6'>
            <h1>Rizki Maulana Citra</h1>
            <h2 className='max-w-max mb-7 text-transparent font-bold text-xl md:text-2xl bg-clip-text bg-gradient-to-r from-primary-500 to-ternary-500 dark:text-transparent'>
              Student &amp; Frontend Developer
            </h2>

            <div className='[&>p:not(:last-child)]:mb-3 [&>p]:max-w-prose md:pb-6'>
              <p>
                Hello👋, I&apos;m Rizki Maulana Citra, a guy who loves to code, music and coffee. Welcome to my personal
                website, where you can find my portfolio, blog and more.
              </p>

              <p>
                As a <strong>self-taught developer</strong>, I started learning web development when I was in 12th grade
                and have been gradually improving my skills over time.
              </p>

              <p>
                I am passionate about <strong>Frontend Development</strong> and enjoy working on the Web. I love
                combining my technical knowledge and creativity to build engaging and user-friendly websites and
                applications.
              </p>

              <p>
                I&apos;m very interested with <strong>Frontend Architecture</strong>,{' '}
                <strong>Frontend Accessibility</strong>, and <strong>User Experience</strong>, and also interested in
                mobile development with Kotlin .
              </p>

              <p>
                <strong>As a person</strong>, <strong>I am constantly striving to improve myself</strong> and{' '}
                <strong>become a better person</strong>. I believe that <em>growth and personal development</em> are
                important aspects of a <strong>fulfilling life</strong>.
              </p>

              <p>
                On this website, I like to share my <strong>various thoughts</strong> about web development related
                topics, general daily life and a place for <strong>showcasing my portfolio</strong>.
              </p>
            </div>
          </div>
        </section>

        <BlogList
          className='pt-32'
          description="If you're looking for some interesting reads, check out my featured blog post. sorted from latest to least, feel free to explore it."
          posts={blogs}
          title='Featured Post'
        />

        <PortfolioList
          description='Check out my featured portfolio, feel free to explore it.'
          title='Featured Portfolio'
          portfolios={portfolios}
        />
      </main>

      <Footer />
    </>
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
