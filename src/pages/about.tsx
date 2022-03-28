import Image from '@/components/atoms/Image'
import Footer from '@/components/organism/Footer'
import TimelineList from '@/components/organism/TimelineList'
import Layout from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'

import clsx from 'clsx'
import { NextPage } from 'next'

const meta = {
  title: 'About Me',
  description:
    "I'm Rizki Maulana Citra, a guy who loves to code, music and coffe, talks about React, Next.js, JavaScript, CSS and Web Development related topics."
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
              layout='fill'
              alt='Rizki Maulana Citra'
              className='rounded-full'
              src='https://ik.imagekit.io/mlnzyx/attachment/meme_U5LXkzUTB.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1648452351958'
              loading='lazy'
              placeholder='blur'
              quality={100}
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
        <h2 className='mb-4'>Timeline</h2>
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
