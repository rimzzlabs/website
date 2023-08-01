import { getPosts } from '@/domains/post'
import { SITE_NAME, SITE_OWNER, SITE_URL } from '@/domains/seo'

import RSS from 'rss'

export async function GET() {
  const posts = await getPosts()
  if (!posts) throw new Error('Cannot build feed.xml, please check your code at `src/feed.ts`')

  const feed = new RSS({
    title: SITE_NAME,
    description: 'Read rizki blog posts',
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed`,
    copyright: SITE_OWNER,
    language: 'en',
    pubDate: new Date('2023-07-24'),
  })

  posts.forEach((post) => {
    feed.item({
      author: SITE_OWNER,
      title: post.title,
      guid: post.slug,
      categories: post.tags,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      date: new Date(post.publishedAt),
    })
  })

  return new Response(feed.xml({ indent: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
