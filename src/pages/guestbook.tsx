import Hero from '@/components/mollecules/Hero'
import Layout from '@/components/templates/Layout'

import { NextPage } from 'next'

const GuestBookPage: NextPage = () => {
  return (
    <Layout
      title='Guestbook'
      description='You can leave a comment, say something about this page, or even telling yourself'
    >
      <Hero
        title='Guestbook'
        description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem maxime temporibus, est id beatae ex ipsam odio pariatur blanditiis excepturi et dolor delectus sequi quis non tempore!'
      />
    </Layout>
  )
}

export default GuestBookPage
