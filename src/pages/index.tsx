import clsx from 'clsx'
import Footer from '@/components/Footer'
import Meta from '@/components/atoms/Meta'
import NextLink from '@/components/NextLink'
import NextImage from '@/components/NextImage'
import HobbyCard from '@/components/cards/HobbyCard'
import FullPage from '@/components/wrapper/FullPage'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import SkillCard from '@/components/cards/SkillCard'
import ProjectCard from '@/components/cards/ProjectCard'
import AnimeContainer from '@/components/wrapper/AnimeContainer'
import { hobies, metaPages, TechincalSkill } from '@/utils/constant'
import { useRef } from 'react'
import { doGet } from '@/libs/doFetch'
import { IoLogoGithub } from 'react-icons/io5'
import type { ProjectType } from '@/types/customType'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await doGet('/project?sort=id:DESC'),
    revalidate: 15
  }
}

type IndexPageProps = {
  result: ProjectType
}

const IndexPage = ({ result }: IndexPageProps) => {
  const footerRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useSmoothScroll(footerRef)

  return (
    <>
      <FullPage className='flex items-center'>
        <Meta {...metaPages.home} />
        <section>
          <p className='font-bold text-2xl md:text-5xl text-typo-700 dark:text-typo-200'>
            <span className='font-normal select-none animate-pulse'>👋</span>
            Hello, I am
          </p>
          <h1 className='xl:text-6xl 2xl:text-7xl my-2 md:my-4'>
            Rizki Maulana Citra
          </h1>
          <p className='max-w-3xl md:text-lg 2xl:text-xl'>
            A Student of Informatics Management at AMIK Serang and I&apos;m a
            Frontend Web Developer who love to work with JavaScript and{' '}
            <NextLink href='https://github.com/enaqx/awesome-react' unstyled>
              React Ecosystem
            </NextLink>
            .
          </p>
          <p className='max-w-3xl md:text-lg 2xl:text-xl mt-2 md:mt-3'>
            I&apos;m a passionate about Web Development and I&apos;m always
            looking for a new challenge, feel free to{' '}
            <NextLink onClick={scrollToRef} href='#contact' unstyled>
              contact me
            </NextLink>{' '}
            if you have any thoughts!
          </p>
        </section>
      </FullPage>

      <div className='py-20 md:py-40'>
        <AnimeContainer
          className={clsx(
            'flex flex-col-reverse w-full',
            'md:flex-row md:justify-between'
          )}>
          <section className='w-full md:pr-4 lg:pr-0'>
            <h2 className='header-color'>About Me</h2>
            <p className='max-w-3xl 2xl:text-lg'>
              My name is Rizki Maulana Citra, I&apos;m from Pandeglang, Banten.
              Banten is one of the most beautiful city in Indonesia. You&apos;ve
              probably heard about{' '}
              <NextLink
                href='https://en.wikipedia.org/wiki/Ujung_Kulon_National_Park'
                unstyled>
                Ujung Kulon National Park
              </NextLink>
              .
            </p>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              I am a 18 Y.O flexible guy who loves to learn new things, I like
              to read article about science and technology. I couldn&apos;t help
              with the science tho, because I have no idea how it works, but I
              still love to read and learn a bit about it.
            </p>
            <h3 className='header-color'>Boring Stuff</h3>
            <p className='max-w-2xl '>
              I&apos;m not in front of my laptop all day, sometimes I go out to
              get a fresh air and get in touch with my friends, and:
            </p>
            <AnimeContainer
              className='list-none grid grid-cols-2 xs:grid-cols-4 gap-2 md:gap-4'
              delay={0.5}
              list>
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
      </div>

      <section>
        <AnimeContainer className='py-20'>
          <h2 className='header-color'>Technical Skills</h2>
          <p className='max-w-3xl md:text-lg'>
            Speaking about skills, I honestly deal well with JavaScript, but my
            first programming language that I&apos;m learned was Java back in
            High School. But it turns out that after I&apos;ve graduated from
            High School, I deal most of my time with Frontend environment which
            are HTML/CSS/JS, and now JavaScript are my main programming
            language.
          </p>
          <p className='max-w-3xl md:text-lg'>
            Once again I&apos;m not limiting myself to only some tech, hey I
            love to learn new things!. Althought not everything are
            &quot;good&quot; with JavaScript, but full-stack JavaScript are my
            future goal.
          </p>
          <AnimeContainer
            delay={0.5}
            className='grid md:grid-cols-2 flex-[1_1_auto] gap-2 md:gap-4'>
            {TechincalSkill.map((data, idx) => (
              <SkillCard key={idx + data.title} {...data} />
            ))}
          </AnimeContainer>
        </AnimeContainer>
      </section>

      <div className='py-20 md:py-40'>
        <AnimeContainer>
          <section>
            <h2 className='header-color'>Projects</h2>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              List of my projects, I&apos;m always looking for new challenges
              and I am always trying to improve myself. Below are list of my
              projects, some of them are just for fun tho, feel free to check
              them out.
            </p>
          </section>
          <AnimeContainer
            delay={0.5}
            className={clsx(
              'grid sm:grid-cols-2 md:grid-cols-3 flex-[1_1_auto]',
              'gap-4 gap-y-6 md:gap-6 md:gap-y-8 mt-2 md:mt-4'
            )}>
            {result.data && result.data.length > 0 && (
              <>
                {result.data
                  .filter((item) => item.attributes.featured)
                  .map((prop) => (
                    <ProjectCard
                      {...prop}
                      key={prop.id + prop.attributes.title}
                    />
                  ))}
                <div
                  title='see more of my projects on GitHub'
                  className={clsx(
                    'w-full h-56 sm:h-auto',
                    'transition-all duration-150 border-2 border-dashed rounded cursor-pointer',
                    'border-dark-300 dark:border-dark-700 hover:border-dark-500 dark:hover:border-dark-500'
                  )}>
                  <NextLink
                    className='flex items-center justify-center w-full h-full'
                    href='https://github.com/rizkimcitra?tab=repositories'>
                    <span className='sr-only'>See more projects on GitHub</span>
                    <IoLogoGithub className='text-[2.5em] md:text-[3em]' />
                  </NextLink>
                </div>
              </>
            )}
          </AnimeContainer>
        </AnimeContainer>
      </div>

      <div className='space-y-8 md:space-y-24 py-20 md:py-40'>
        <section>
          <h2 className='mb-2 md:mb-4 header-color'>Article</h2>
          <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
            I&apos;m planning to write an article about my personal opinion,
            Internet, Web Development, and my daily life, if you&apos;re
            interested, you can check them out later, as I&apos;m currently
            still making it happens, it&apos;s just a little bit slow because
            currently I have a lot of things to do for college.
          </p>
        </section>
        <section>
          <h2 className='mb-2 md:mb-4 header-color'>Contact</h2>
          <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
            Hey, wanna talk something with me? I&apos;m always open to new
            topics, if you are interested to talk with me, feel free to reach me
            out at my email or my social media account. You can see them in the
            footer below.
          </p>
        </section>
      </div>
      <Footer ref={footerRef} />
    </>
  )
}

export default IndexPage
