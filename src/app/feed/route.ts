import { SITE_NAME, SITE_OWNER, SITE_URL } from '@/utils/env/client'

import { allPosts } from 'contentlayer/generated'
import RSS from 'rss'

export function GET() {
  const feed = new RSS({
    title: SITE_NAME,
    description: 'Read rizki blog posts',
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed`,
    copyright: SITE_OWNER,
    language: 'en',
    pubDate: new Date('2023-07-24'),
  })

  allPosts.forEach((post) => {
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
