import HeroWithPhoto from '@/components/mollecules/HeroWithPhoto'
import Timeline from '@/components/organism/Timeline'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'
import { getMetaData } from '@/libs/metaData'
import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

const About: NextPage = () => {
  const meta = getMetaData({
    title: 'About',
    description: `A computer science student, frontend developer and an adventurer of my own mind. I like to express my feelings through code, and a quite place would be nice to have around me.`,
    keywords: ['About Rizki Maulana Citra', 'About Rizki M Citra', 'About Rizkicitra', 'About Rizki Citra'],
    og_image: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-${720},h-${720},tr:bl-10,f-auto/profile-about.webp`,
    og_image_alt: 'Rizki Maulana Citra',
    slug: '/about',
    type: 'website'
  })

  return (
    <Layout {...(meta as LayoutProps)}>
      <HeroWithPhoto
        title={meta.title as string}
        subtitle='Rizki Maulana Citra'
        description={meta.description as string}
        img={{
          src: meta.openGraph?.images ? meta.openGraph.images[0].url : '',
          alt_title: 'Rizki Maulana Citra'
        }}
      >
        <div className={twclsx('prose dark:prose-invert')}>
          <p className={twclsx('text-theme-700 dark:text-theme-200')}>
            I choose Information Technology as my main prospect career path, therefore I&apos;m facing many obstacles
            and it was quite challenging.
          </p>
          <blockquote>
            <style jsx>
              {`
                blockquote {
                  border-image: linear-gradient(to bottom, #3b82f6, #14b8a6) 1;
                }
              `}
            </style>
            <p className={twclsx('text-theme-700 dark:text-theme-200')}>
              I change during the course of a day. I wake and I&apos;m one person, and when I go to sleep I know for
              certain I&apos;m somebody else.
            </p>
          </blockquote>
        </div>
      </HeroWithPhoto>

      <section className={twclsx('pt-10 md:pt-20')}>
        <h2 className={twclsx('mb-2')}>Timeline</h2>
        <p className={twclsx('max-w-prose mb-4')}>
          Take a look at my timeline below, it consists of my career path, formal education and more.
        </p>
        <Timeline timeline={timeline} />
      </section>

      <section className={twclsx('pt-10 md:pt-20')}>
        <h2 className={twclsx('mb-4')}>Contact</h2>
        <p>
          Hi there, if you want to make a new friendship, bring your idea to reality, or just want to know more about
          me, please contact me on one of my social media account.
        </p>
      </section>
    </Layout>
  )
}

export default About
