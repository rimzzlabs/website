import Hero from '@/components/mollecules/Hero'
import Footer from '@/components/organism/Footer'
import TimelineList from '@/components/organism/TimelineList'
import Layout from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'

import { NextPage } from 'next'

const meta = {
  title: 'About Me',
  description:
    "I'm Rizki Maulana Citra, a guy who loves to code, music and coffe, talks about React, Next.js, JavaScript, CSS and Web Development related topics."
}

const About: NextPage = () => {
  return (
    <Layout {...meta}>
      <Hero {...meta}>
        <p className='mt-2 md:mt-4'>Well you&apos;ve seen that line before on the Home Page</p>
      </Hero>

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
