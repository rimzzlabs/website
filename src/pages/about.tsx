import Image from '@/components/atoms/Image'
import Footer from '@/components/organism/Footer'
import TimelineList from '@/components/organism/TimelineList'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'

import clsx from 'clsx'
import { NextPage } from 'next'

const meta: LayoutProps = {
  title: 'About Me',
  description:
    "Howdy👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffee, talks about React, Next.js, CSS and Web Development related topics.",
  openGraph: {
    images: [
      {
        url: 'https://ik.imagekit.io/mlnzyx/attachment/meme_U5LXkzUTB.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648452351958',
        alt: 'Rizki Maulana Citra',
        height: 600,
        width: 1200,
        type: 'image/webp'
      }
    ]
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'about rizkicitra, about Rizki Citra, about rizkicitra, about rizkimcitra, about Rizki M Citra, about Rizki, about Maulana, Citra, Citra Dev, Citra, Rizki Maulana Citra, Rizki Maulana, Rizki Github, rizki github, Rizki GitHub, Rizki Nextjs, Personal Website, Frontend, Frontend Dev, Frontend Developer, Developer, Indonesia, Rizki Citra Developer, Rizki Citra Dev, Rizki Dev, Rizki Maulana Citra, rmaulana citra, developer from indonesia, personal website, blog, talks about react, talks about react and nextjs, web development related topics, developer, AMIK Serang'
    },
    {
      name: 'author',
      content: 'Rizki Maulana Citra'
    }
  ]
}

const About: NextPage = () => {
  return (
    <Layout {...meta}>
      <div
        className={clsx(
          'flex flex-col pb-10 md:pb-20',
          'md:flex-row-reverse md:justify-between md:items-center',
          'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
        )}
      >
        <figure className={clsx('flex items-center md:justify-end', 'mb-4 md:mb-0')}>
          <div className='relative w-24 md:w-40 h-24 md:h-40'>
            <Image
              title='Rizki Maulana Citra'
              layout='fill'
              alt='Rizki Maulana Citra'
              className='rounded-full'
              src='https://ik.imagekit.io/mlnzyx/attachment/meme_U5LXkzUTB.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648452351958'
              loading='lazy'
              placeholder='blur'
              quality={70}
              blurDataURL='/blur.svg'
            />
          </div>
        </figure>
        <section>
          <h1>About</h1>
          <h2
            className={clsx(
              'max-w-max my-3 md:my-4',
              'font-bold text-transparent dark:text-transparent',
              'bg-clip-text bg-gradient-to-r',
              'from-primary-500 to-ternary-500'
            )}
          >
            Rizki Maulana Citra
          </h2>
          <p className='max-w-prose'>{meta.description}</p>
        </section>
      </div>

      <section className='pt-10 md:pt-20'>
        <h2 className='mb-2'>Timeline</h2>
        <p className='mb-4'>
          The biggest enemy of all time is called <em>time</em>, every human was afraid of this, no one know when they
          die, no one know what&apos;s <em>exactly</em> going to happen tomorrow, but that is the truth, I keep moving
          forward, living in my own life, so why not take a look at my little timeline below.
        </p>
        <TimelineList timeline={timeline} />
      </section>

      <section className='pt-10 md:pt-20'>
        <h2 className='mb-4'>Contact</h2>
        <p>
          Hi there, if you want to make a new friendship, bring your idea to reality, or just want to know more about
          me, please contact me on one of my social media account.
        </p>
      </section>
      <Footer />
    </Layout>
  )
}

export default About
