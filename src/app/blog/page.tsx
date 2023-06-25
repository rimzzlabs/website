import { getPosts } from '@/domains/post'
import { SITE_NAME, SITE_OWNER, SITE_URL, createMetadata } from '@/domains/seo'

import { BlogHero, BlogPosts } from '@/features/blog'
import { MainLayout } from '@/layouts'

export const metadata = createMetadata({
  title: 'Blog',
  templateTitle: SITE_NAME,
  description: `My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics`,
  openGraph: {
    images: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp`,
    type: 'website',
    title: SITE_OWNER,
  },
  creator: 'Rizki Maulana Citra',
  canonical: SITE_URL + '/blog',
})

export default async function Page() {
  const posts = await getPosts()

  return (
    <MainLayout className='space-y-10 md:space-y-14'>
      <BlogHero />
      <BlogPosts posts={posts} />
    </MainLayout>
  )
}
