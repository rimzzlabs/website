import { getPosts } from '@/domains/post'
import { SITE_OWNER, SITE_URL } from '@/domains/seo'

import { NextResponse } from 'next/server'
import RSS from 'rss'

export async function GET() {
  try {
    const posts = await getPosts()
    if (!posts) throw new Error()

    const feed = new RSS({
      title: 'rizkicitra.dev',
      description: 'Read rizki blog posts',
      site_url: SITE_URL,
      feed_url: `${SITE_URL}/feed.xml`,
      copyright: 'Rizki Maulana Citra',
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

    return new NextResponse<string>(feed.xml({ indent: true }), {
      status: 200,
      statusText: 'Success',
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, message: 'Cannot get RSS feed, please try again later' },
      { status: 500 },
    )
  }
}
