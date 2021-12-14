import Footer from '@/components/Footer'
import FullPage from '@/components/FullPage'
import NextImage from '@/components/NextImage'
import NextLink from '@/components/NextLink'
import PageMeta from '@/components/PageMeta'
import { metaPages, spareTime } from '@/utils/constant'
import clsx from 'clsx'
// import ProjectCard from '@/components/Cards/ProjectCard'
import { useRef } from 'react'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import AnimeDiv from '@/components/AnimedDiv'
import { doGet } from '@/libs/doFetch'
import { ProjectType } from '@/types/customType'
import ProjectCard from '@/components/Cards/ProjectCard'

export const getStaticProps = async () => {
  const data = await doGet('/project?sort=id:DESC')

  if (data.isError)
    return {
      props: {
        projects: {} as ProjectType
      }
    }

  return {
    props: {
      projects: data.data
    }
  }
}

type IndexPageProps = {
  projects: ProjectType
}

const IndexPage = ({ projects: { data } }: IndexPageProps) => {
  const footerRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useSmoothScroll(footerRef)

  return (
    <>
      <FullPage className='flex items-center'>
        <PageMeta {...metaPages.home} />
        <section>
          <p className='font-bold text-xl md:text-3xl text-typo-800 dark:text-typo-200'>
            <span className='font-normal select-none'>👋</span>
            Hello, I am
          </p>
          <h1 className='xl:text-6xl 2xl:text-7xl my-2 md:my-4'>
            Rizki Maulana Citra
          </h1>
          <p className='max-w-3xl md:text-lg 2xl:text-xl'>
            I am a Student of Management Informatics at AMIK Serang and I&apos;m
            a Frontend Web Developer who love to work with JavaScript and{' '}
            <NextLink
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/enaqx/awesome-react'
              unstyled>
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
        <AnimeDiv
          className={clsx(
            'flex flex-col-reverse w-full',
            'md:flex-row md:justify-between'
          )}>
          <section className='w-full md:pr-4 lg:pr-0'>
            <h2 className='underline decoration-primary-500 dark:decoration-rose-500'>
              About Me
            </h2>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              My name is Rizki Maulana Citra, I&apos;m from Pandeglang, Banten.
              Are you unfamiliar with Banten or Pandeglang?, ever heard about
              Ujung Kulon National Park? yes that&apos;s where my hometown.
            </p>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              I am a 18 Y.O flexible guy who loves to learn new things, I like
              to read article about science and technology. I couldn&apos;t help
              with the science tho, because I have no idea how it works but I
              still love to read and learn a bit about it.
            </p>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              In my spare time I often to:
            </p>
            <ul className='list-disc pl-4 md:pl-6'>
              {spareTime.map((item, index) => (
                <li key={item.title + index}>
                  <h3 className='underline decoration-dark-800 dark:decoration-dark-400 underline-offset-[-1px]'>
                    {item.title}
                  </h3>
                  <p className='max-w-2xl'>{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <figure className='flex items-center justify-center'>
            <div className='md:self-start scale-75 sm:scale-100'>
              <NextImage
                src='/rizki.webp'
                alt='Rizki Maulana Citra'
                width={244}
                height={244}
              />
            </div>
          </figure>
        </AnimeDiv>
      </div>

      <div className='py-20 md:py-40'>
        <AnimeDiv>
          <section>
            <h2 className='underline decoration-primary-500 dark:decoration-rose-500'>
              Projects
            </h2>
            <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
              List of my projects, I&apos;m always looking for new challenges
              and I am always trying to improve myself. Below are list of my
              projects, some of them are just for fun tho, feel free to check
              them out.
            </p>
          </section>
          <ul
            className={clsx(
              'grid sm:grid-cols-2 md:grid-cols-3 place-content-center flex-[1_1_auto]',
              'gap-4 gap-y-6 md:gap-6 md:gap-y-8'
            )}>
            {data.length > 0 && (
              <>
                {data
                  .filter((item) => item.attributes.featured)
                  .map((item) => (
                    <ProjectCard
                      {...item}
                      key={item.id + item.attributes.title}
                    />
                  ))}
              </>
            )}
          </ul>
        </AnimeDiv>
      </div>

      <AnimeDiv className='py-2 md:py-40'>
        <h2 className='mb-2 md:mb-4 underline decoration-primary-500 dark:decoration-rose-500'>
          Contact
        </h2>
        <p className='max-w-3xl 2xl:text-lg mt-2 md:mt-4'>
          Hey, wanna talk something with me? I&apos;m always open to new topics,
          if you are interested to talk with me, feel free to reach me out at my
          email or my social media account. You can see them in the footer
          below.
        </p>
      </AnimeDiv>
      <Footer ref={footerRef} />
    </>
  )
}

export default IndexPage
