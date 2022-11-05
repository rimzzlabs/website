import { Blockquote } from '@/components/content'

import { HeroWithPhoto, LayoutPage } from '@/UI/templates'
import type { LayoutPageProps } from '@/UI/templates'

import { getMetaPage } from '@/libs/metapage'
import { twclsx } from '@/libs/twclsx'

import type { NextPage } from 'next'

const About: NextPage = () => {
  const meta = getMetaPage({
    title: 'About',
    description: `A computer science student, frontend developer and an adventurer of my own mind. I like to express my feelings through code, and a quite place would be nice to have around me.`,
    keywords: ['About Rizki Maulana Citra', 'About Rizki M Citra', 'About Rizkicitra', 'About Rizki Citra'],
    og_image: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-${720},h-${720},tr:bl-10,f-auto/rizkimcitra.webp`,
    og_image_alt: 'Rizki Maulana Citra',
    slug: '/about',
    type: 'website'
  })

  return (
    <LayoutPage {...(meta as LayoutPageProps)}>
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

          <Blockquote>
            <p>The important thing is not to stop questioning. Curiosity has its own reason for existence.</p>
            <span>- Albert Einstein</span>
          </Blockquote>

          <p>
            I start learning <strong>Web Development</strong> in <strong>early 2021</strong>, but before that happens,
            I&apos;ve actually learned the basics about <strong>Software Engineering</strong> in{' '}
            <strong>High School</strong>, when I was at 12th grade. I&apos;m focusing on{' '}
            <strong>Frontend Development</strong>, including <strong>Mobile App Development.</strong>
          </p>

          <p>
            On this website, I like to share my various thoughts, including <strong>web development</strong>, and
            showcase my <strong>personal portfolio.</strong>
          </p>
        </div>
      </HeroWithPhoto>

      <section className={twclsx('pt-10 md:pt-20')}>
        <h2 className={twclsx('mb-4')}>Contact</h2>
        <p>Hi there, if you want to make a friendship with me, please contact me on one of my social media accounts.</p>
      </section>
    </LayoutPage>
  )
}

export default About
