import { doGet } from '@/libs/doFetch'
import type { ArticleProps, ProjectProps, SingleArticleType, SingleProjectType } from '@/types/customType'
import { TechincalSkill, hobies, metaPages } from '@/utils/constant'

import clsx from 'clsx'
import type { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { IoLogoGithub, IoMail } from 'react-icons/io5'
import readingTime from 'reading-time'

const Footer = dynamic(() => import('@/components/Footer'))
const NextImage = dynamic(() => import('@/components/NextImage'))
const NextLink = dynamic(() => import('@/components/NextLink'))
const Meta = dynamic(() => import('@/components/atoms/Meta'))
const ArticleCard = dynamic(() => import('@/components/cards/ArticleCard'))
const HobbyCard = dynamic(() => import('@/components/cards/HobbyCard'))
const ProjectCard = dynamic(() => import('@/components/cards/ProjectCard'))
const SkillCard = dynamic(() => import('@/components/cards/SkillCard'))
const AnimeContainer = dynamic(() => import('@/components/wrapper/AnimeContainer'))
const FullPage = dynamic(() => import('@/components/wrapper/FullPage'))

export const getStaticProps: GetStaticProps = async () => {
  const projectsRes = await doGet<ProjectProps>('/project?sort=id:DESC')
  const articlesRes = await doGet<ArticleProps>('/article?sort=id:DESC')

  const articles = articlesRes.result.data.map((item) => {
    const estRead = readingTime(item.attributes.content)
    return { ...item, estRead }
  })
  return {
    props: {
      projects: projectsRes.result.data,
      articles
    },
    revalidate: 1
  }
}

type IndexPageProps = {
  projects: Array<SingleProjectType>
  articles: Array<SingleArticleType>
}

const IndexPage = ({ projects, articles }: IndexPageProps) => {
  return (
    <>
      <FullPage className='relative flex items-center'>
        <Meta {...metaPages.home} />
        <section>
          <h1 className='xl:text-6xl 2xl:text-7xl my-2 md:my-4'>
            Hello, I&apos;m Rizki <span className='font-normal'>👋</span>
          </h1>
          <p className='max-w-3xl md:text-lg 2xl:text-xl'>
            A student at AMIK Serang and a Software Developer with a strong Frontend Web Development skill, focused on
            User Interactivity and User Experience.
          </p>
        </section>
      </FullPage>

      <AnimeContainer className={clsx('flex flex-col-reverse w-full py-20 md:py-40', 'md:flex-row md:justify-between')}>
        <section className='w-full md:pr-4 lg:pr-0'>
          <h2 className='header-color'>About Me</h2>
          <p className='max-w-3xl 2xl:text-lg'>
            My name is Rizki Maulana Citra, I was born in Pandeglang Banten. If you don&apos;t know Banten, you may have
            heard of{' '}
            <NextLink
              href='https://en.wikipedia.org/wiki/Ujung_Kulon_National_Park'
              className='animated-underline text-primary-500 dark:text-primary-400'
            >
              Ujung Kulon National Park
            </NextLink>
            .
          </p>
          <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
            I am an 18 year old who is passionate about Computer Science and Web Development, I&apos;m so excited about
            future Web Technology, love to learn new things and JavaScript. fun fact: coffee sometimes can help me solve
            my problem when debugging.
          </p>
          <h3 className='header-color'>Hobbies</h3>
          <p className='max-w-2xl '>
            I&apos;m not in front of my laptop all day, sometimes I go out and get some fresh air, then hang out with
            friends, and sometimes, I:
          </p>
          <AnimeContainer className='list-none grid grid-cols-2 xs:grid-cols-4 gap-2 md:gap-4' delay={0} list>
            {hobies.map((item, idx) => (
              <HobbyCard key={idx + item.title} {...item} />
            ))}
          </AnimeContainer>
        </section>

        <figure className='flex items-center justify-center'>
          <div className='md:self-start scale-75 sm:scale-100'>
            <NextImage
              src='https://ik.imagekit.io/mlnzyx/personal_web-og/rizki_n-T6Lnn7f.webp?updatedAt=1639726869965'
              alt='Rizki Maulana Citra'
              width={244}
              height={244}
              className='rounded'
            />
          </div>
        </figure>
      </AnimeContainer>

      <AnimeContainer className='py-20 -scroll-mt-96'>
        <section>
          <h2 className='header-color'>Technical Skills</h2>
          <p className='max-w-3xl md:text-lg'>
            Some of my Technical Skills in Web Development. To be honest, the first programming language I learned was
            Java, when I was still in high school. But apparently, when I graduated, I was learning more about Frontend
            Environment, which are HTML, CSS and JavaScript, and Now my main Programming Language is TypeScript followed
            by JavaScript.
          </p>
          <AnimeContainer
            delay={0.5}
            className={clsx('grid md:grid-cols-2 flex-[1_1_auto]', 'gap-4 gap-y-6 md:gap-6 md:gap-y-8 mt-8 md:mt-10')}
          >
            {TechincalSkill.map((data, idx) => (
              <SkillCard key={idx + data.title} {...data} />
            ))}
          </AnimeContainer>
        </section>
      </AnimeContainer>

      <AnimeContainer className='space-y-8 md:space-y-24 py-20 md:py-40 -scroll-mt-96'>
        <section>
          <h2 className='mb-2 md:mb-4 header-color'>Article</h2>
          <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
            I talk about anything that interest me, Web Development, Internet, as well as Social Life based on my
            personal view.
          </p>
          <AnimeContainer
            list
            delay={0.4}
            className={clsx('grid sm:grid-cols-2', 'w-full flex-[1_1_auto] gap-4 md:gap-8 mt-4 md:mt-8')}
          >
            {articles.length > 0 &&
              articles.map((data, idx) => (
                <li key={idx} className='min-h-[8rem]'>
                  <ArticleCard {...data} />
                </li>
              ))}
          </AnimeContainer>
        </section>
      </AnimeContainer>

      <AnimeContainer className='py-20 md:py-40 -scroll-mt-96'>
        <section>
          <h2 className='header-color'>Projects</h2>
          <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
            I am always looking for new challenges, and always trying to improve myself. Here&apos;s a list of my
            projects you might be interested in
          </p>
        </section>
        <AnimeContainer
          delay={0.5}
          className={clsx(
            'grid sm:grid-cols-2 md:grid-cols-3 flex-[1_1_auto]',
            'gap-4 gap-y-6 md:gap-6 md:gap-y-8 mt-2 md:mt-4'
          )}
        >
          {projects.length > 0 && (
            <>
              {projects
                .filter((item) => item.attributes.featured)
                .map((prop) => (
                  <ProjectCard {...prop} key={prop.id + prop.attributes.title} />
                ))}
              <div
                title='see more of my projects on GitHub'
                className={clsx(
                  'w-full h-56 sm:h-auto',
                  'transition-all duration-150 border-2 border-dashed rounded cursor-pointer',
                  'border-dark-300 dark:border-dark-700 hover:border-dark-500 dark:hover:border-dark-500'
                )}
              >
                <NextLink
                  className='flex items-center justify-center w-full h-full'
                  href='https://github.com/rizkimcitra?tab=repositories'
                >
                  <span className='sr-only'>See more projects on GitHub</span>
                  <IoLogoGithub className='text-[2.5em] md:text-[3em]' />
                </NextLink>
              </div>
            </>
          )}
        </AnimeContainer>
      </AnimeContainer>

      <section className='py-20 -scroll-mt-96'>
        <h2 className='mb-2 md:mb-4 header-color'>Contact</h2>
        <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
          Hello, if you interested to talk with me, I am available at any time, please do reach me at one of my social
          media below, or you can click the button below to send me an email, thank you.
        </p>
        <NextLink
          href='mailto:rmaulana.citra@gmail.com'
          className={clsx(
            'flex items-center h-8 md:h-10 max-w-max',
            'px-2 md:px-6 rounded transition-all space-x-2 md:space-x-3 bg-gradient-to-r',
            'from-primary-600 to-primary-500 text-white',
            'active:grayscale'
          )}
        >
          <IoMail />
          <span>Email me</span>
        </NextLink>
      </section>
      <Footer />
    </>
  )
}

export default IndexPage
