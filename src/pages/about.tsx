import HeroWithPhoto from '@/components/mollecules/HeroWithPhoto'
import Timeline from '@/components/organism/Timeline'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'
import { getMetaData } from '@/libs/metaData'

import { NextPage } from 'next'

const meta = getMetaData({
  title: 'About',
  description: `A computer science student, frontend developer and an adventurer of my own mind. I like to express my feelings through code, and a quite place would be nice to have around me.`,
  keywords: ['About Rizki Maulana Citra', 'About Rizki M Citra', 'About Rizkicitra', 'About Rizki Citra'],
  og_image:
    'https://ik.imagekit.io/mlnzyx/attachment/meme_U5LXkzUTB.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648452351958',
  og_image_alt: 'Rizki Maulana Citra',
  slug: '/about',
  type: 'website'
})

const About: NextPage = () => {
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
        <div className='prose dark:prose-invert'>
          <p className='text-theme-700 dark:text-theme-200'>
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
            <p className='text-theme-700 dark:text-theme-200'>
              I change during the course of a day. I wake and I’m one person, and when I go to sleep I know for certain
              I’m somebody else.
            </p>
          </blockquote>
        </div>
      </HeroWithPhoto>

      <section className='pt-10 md:pt-20'>
        <h2 className='mb-2'>Timeline</h2>
        <p className='mb-4 max-w-prose'>
          Take a look at my timeline below, it consists of my career path, formal education and more.
        </p>
        <Timeline timeline={timeline} />
      </section>

      <section className='pt-10 md:pt-20'>
        <h2 className='mb-4'>Contact</h2>
        <p>
          Hi there, if you want to make a new friendship, bring your idea to reality, or just want to know more about
          me, please contact me on one of my social media account.
        </p>
      </section>
    </Layout>
  )
}

export default About
