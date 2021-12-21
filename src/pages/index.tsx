import clsx from 'clsx';
import Footer from '@/components/Footer';
import Meta from '@/components/atoms/Meta';
import NextLink from '@/components/NextLink';
import NextImage from '@/components/NextImage';
import HobbyCard from '@/components/cards/HobbyCard';
import FullPage from '@/components/wrapper/FullPage';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import SkillCard from '@/components/cards/SkillCard';
import ProjectCard from '@/components/cards/ProjectCard';
import AnimeContainer from '@/components/wrapper/AnimeContainer';
import { hobies, metaPages, TechincalSkill } from '@/utils/constant';
import { useRef } from 'react';
import { doGet } from '@/libs/doFetch';
import { IoLogoGithub, IoMail } from 'react-icons/io5';
import type { ProjectType } from '@/types/customType';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await doGet('/project?sort=id:DESC'),
    revalidate: 15
  };
};

type IndexPageProps = {
  result: ProjectType;
};

const IndexPage = ({ result }: IndexPageProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useSmoothScroll(footerRef);

  return (
    <>
      <FullPage className="flex items-center">
        <Meta {...metaPages.home} />
        <section>
          <p className="font-bold text-2xl md:text-5xl text-typo-700 dark:text-typo-200">
            <span className="font-normal select-none animate-pulse">👋</span>
            Hello, I am
          </p>
          <h1 className="xl:text-6xl 2xl:text-7xl my-2 md:my-4">Rizki Maulana Citra</h1>
          <p className="max-w-3xl md:text-lg 2xl:text-xl">
            A student at AMIK Serang and a Frontend Web Developer who enjoys working with JavaScript and the{' '}
            <NextLink href="https://github.com/enaqx/awesome-react" unstyled>
              React ecosystem
            </NextLink>
            .
          </p>
          <p className="max-w-3xl md:text-lg 2xl:text-xl mt-2 md:mt-3">
            I&apos;m passionate about Web Development and always looking for new challenges and experiences, please do{' '}
            <NextLink onClick={scrollToRef} href="#contact" unstyled>
              contact me
            </NextLink>{' '}
            if you have any questions.
          </p>
        </section>
      </FullPage>

      <div className="py-20 md:py-40">
        <AnimeContainer className={clsx('flex flex-col-reverse w-full', 'md:flex-row md:justify-between')}>
          <section className="w-full md:pr-4 lg:pr-0">
            <h2 className="header-color">About Me</h2>
            <p className="max-w-3xl 2xl:text-lg">
              My name is Rizki Maulana Citra, I was born in Pandeglang Banten. If you don&apos;t know Banten, you may
              have heard of{' '}
              <NextLink href="https://en.wikipedia.org/wiki/Ujung_Kulon_National_Park" unstyled>
                Ujung Kulon National Park
              </NextLink>
              .
            </p>
            <p className="max-w-3xl 2xl:text-lg mt-2 md:mt-4">
              I am an 18 year old who is passionate about Science and technology. Even though I don&apos;t really
              understand how science works, I still enjoy reading articles and scientific journals. I am a person who
              likes to learn new things, specific things cannot limit me in seeking knowledge, but what I mean here is
              more emphasized in the field of technology.
            </p>
            <h3 className="header-color">Hobbies</h3>
            <p className="max-w-2xl ">
              I&apos;m not in front of my laptop all day, sometimes I go out and get some fresh air, then hang out with
              friends, and sometimes, I:
            </p>
            <AnimeContainer className="list-none grid grid-cols-2 xs:grid-cols-4 gap-2 md:gap-4" delay={0} list>
              {hobies.map((item, idx) => (
                <HobbyCard key={idx + item.title} {...item} />
              ))}
            </AnimeContainer>
          </section>

          <figure className="flex items-center justify-center">
            <div className="md:self-start scale-75 sm:scale-100">
              <NextImage
                src="https://ik.imagekit.io/mlnzyx/personal_web-og/rizki_n-T6Lnn7f.webp?updatedAt=1639726869965"
                alt="Rizki Maulana Citra"
                width={244}
                height={244}
                className="rounded"
              />
            </div>
          </figure>
        </AnimeContainer>
      </div>

      <section>
        <AnimeContainer className="py-20">
          <h2 className="header-color">Technical Skills</h2>
          <p className="max-w-3xl md:text-lg">
            Some of my Technical Skills in Web Development. To be honest, the first programming language I learned was
            Java, when I was still in high school. But apparently, when I graduated, I was learning more about Frontend
            Environment, which are HTML, CSS and JavaScript, and Now my main Programming Language is TypeScript followed
            by JavaScript.
          </p>
          <AnimeContainer delay={0.5} className="grid md:grid-cols-2 flex-[1_1_auto] gap-2 md:gap-4">
            {TechincalSkill.map((data, idx) => (
              <SkillCard key={idx + data.title} {...data} />
            ))}
          </AnimeContainer>
        </AnimeContainer>
      </section>

      <div className="py-20 md:py-40">
        <AnimeContainer>
          <section>
            <h2 className="header-color">Projects</h2>
            <p className="max-w-3xl 2xl:text-lg mt-2 md:mt-4">
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
            {result.data && result.data.length > 0 && (
              <>
                {result.data
                  .filter((item) => item.attributes.featured)
                  .map((prop) => (
                    <ProjectCard {...prop} key={prop.id + prop.attributes.title} />
                  ))}
                <div
                  title="see more of my projects on GitHub"
                  className={clsx(
                    'w-full h-56 sm:h-auto',
                    'transition-all duration-150 border-2 border-dashed rounded cursor-pointer',
                    'border-dark-300 dark:border-dark-700 hover:border-dark-500 dark:hover:border-dark-500'
                  )}
                >
                  <NextLink
                    className="flex items-center justify-center w-full h-full"
                    href="https://github.com/rizkimcitra?tab=repositories"
                  >
                    <span className="sr-only">See more projects on GitHub</span>
                    <IoLogoGithub className="text-[2.5em] md:text-[3em]" />
                  </NextLink>
                </div>
              </>
            )}
          </AnimeContainer>
        </AnimeContainer>
      </div>

      <div className="space-y-8 md:space-y-24 py-20 md:py-40">
        <section>
          <h2 className="mb-2 md:mb-4 header-color">Article</h2>
          <p className="max-w-3xl 2xl:text-lg mt-2 md:mt-4">
            I plan to write articles that will talk about Information Technology, Web Development, and my daily life. If
            you&apos;re interested, you can visit it later, because I&apos;m currently a little busy with college
          </p>
        </section>
        <section>
          <h2 className="mb-2 md:mb-4 header-color">Contact</h2>
          <p className="max-w-3xl 2xl:text-lg mt-2 md:mt-4">
            If you have any questions and want to contact me, please contact me via email, social media is where I learn
            and share.
          </p>
          <NextLink
            href="mailto:rmaulana.citra@gmail.com"
            className={clsx(
              'flex items-center h-8 md:h-10 max-w-max',
              'px-2 md:px-4 rounded transition-all space-x-2 md:space-x-3 bg-gradient-to-r',
              'from-purple-500 via-primary-500 to-sky-500 text-white',
              'dark:from-red-500 dark:via-rose-500 dark:to-primary-500',
              'hover:opacity-75 active:opacity-100 active:grayscale'
            )}
          >
            <IoMail />
            <span>Email me</span>
          </NextLink>
        </section>
      </div>
      <Footer ref={footerRef} />
    </>
  );
};

export default IndexPage;
