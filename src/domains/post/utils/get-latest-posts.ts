import { compareDesc } from '@/utils/date'

import { getPosts } from './get-posts'

import { P, match } from 'ts-pattern'

export const getLatestPosts = async () => {
  const posts = await getPosts()

  return match<typeof posts, typeof posts>(posts)
    .with(P.array(), (posts) => {
      return posts
        .sort((a, b) => {
          const ad = new Date(a.publishedAt)
          const bd = new Date(b.publishedAt)
          return compareDesc(ad, bd)
        })
        .slice(0, 3)
    })
    .otherwise(() => null)
}
