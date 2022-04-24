import HeroWithPhoto from '@/components/mollecules/HeroWithPhoto'
import Footer from '@/components/organism/Footer'
import Timeline from '@/components/organism/Timeline'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { timeline } from '@/libs/constants/timeline'
import { getMetaData } from '@/libs/metaData'

import { NextPage } from 'next'

const meta = getMetaData({
  title: 'About',
  description: `Howdy👋, I'm Rizki Maulana Citra, a guy who loves to code, music and coffee, talks about React, CSS and Web Development related topics.`,
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
      />

      <section className='pt-10 md:pt-20'>
        <h2 className='mb-2'>Timeline</h2>
        <p className='mb-4'>
          The biggest enemy of all time is called <em>time</em>, every human was afraid of this, no one know when they
          die, no one know what&apos;s <em>exactly</em> going to happen tomorrow, but that is the truth, I keep moving
          forward, living in my own life, so why not take a look at my little timeline below.
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
      <Footer />
    </Layout>
  )
}

export default About
