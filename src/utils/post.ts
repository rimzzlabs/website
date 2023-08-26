import type { TocList } from '@/components/table-of-contents'

import { slugify } from './common'

import type { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns/esm'
import { P, match } from 'ts-pattern'

export const filterPublishedPosts = (posts: Post[]) => {
  const isDev = process.env.NODE_ENV === 'development'

  return match([isDev, posts])
    .with([true, P.select()], (posts) => posts)
    .otherwise(([, posts]) => posts.filter((post) => post.status === 'ready'))
}

export const sortLatestPosts = (posts: Post[]) => {
  return posts
    .slice(0)
    .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}

export const sliceFirstThreePosts = (posts: Post[]) => {
  return posts.slice(0, 3)
}

export const getTableOfContents = (body: string) => {
  const headingsRegex = /^(#+)\s(.+)/gm
  const matches = Array.from(body.matchAll(headingsRegex))
  const toc: TocList = matches.map((match) => ({
    level: match[1].length, // Determine the depth based on the number of '#' symbols
    text: match[2], // Extract the heading text
    url: slugify(match[2]), // Generate an URL-friendly ID from the heading text
  }))

  return toc
}

export const getLatestPosts = (posts: Post[]) => {
  const publishedPosts = filterPublishedPosts(posts)
  return publishedPosts
    .slice(0)
    .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}

export const getPostsByTag = (posts: Post[], tag?: string) => {
  const publishedPosts = filterPublishedPosts(posts)
  return match<[Post[], string | undefined], Post[]>([publishedPosts, tag])
    .with([P._, P.nullish], () => [])
    .with([P.nullish, P._], () => [])
    .with([P.not(P.nullish), P.string], ([posts]) => {
      return posts.filter((post) =>
        post.tags.map((tag) => tag.toLowerCase()).includes(tag?.toLowerCase() ?? ''),
      )
    })
    .exhaustive()
}

export const getPostTags = (posts: Post[]) => {
  return match(posts)
    .with(P.nullish, () => [])
    .with(P.array(), (posts) => {
      return posts
        .map((post) => post.tags)
        .flat()
        .reduce((acc, cur) => {
          if (!acc.includes(cur)) {
            acc.push(cur)
          }
          return acc
        }, [] as string[])
    })
    .exhaustive()
}
