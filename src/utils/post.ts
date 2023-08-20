import type { TocList } from '@/components/table-of-contents'

import { asyncFetchJSON } from '@/utils/async-fetch'

import { compareDesc } from './date'
import { UMAMI_DEPLOYED_URL } from './env/server'
import { slugify } from './slugify'
import { getUmamiToken } from './umami'

import { redis } from '@db/redis'
import type { Post } from 'contentlayer/generated'
import { P, match } from 'ts-pattern'

const filterPublishedPost = (posts: Post[]) => {
  const isDev = process.env.NODE_ENV === 'development'

  return match([isDev, posts])
    .with([true, P.select()], (posts) => posts)
    .otherwise(([, posts]) => posts.filter((post) => post.status === 'ready'))
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
  const publishedPosts = filterPublishedPost(posts)
  return publishedPosts
    .slice(0)
    .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}

type SubProp = { value: number; change: number }
type ResponsePageViews = {
  pageviews: SubProp
  uniques: SubProp
  bounces: SubProp
  totaltime: SubProp
}

export const getPostViews = async (slug: string): Promise<number> => {
  const redisViews = await redis.get('page-views-of' + slug)

  if (!redisViews) {
    const endDate = new Date().getTime()
    const token = await getUmamiToken()
    if (!token) return 0

    const url = `/api/website/1/stats?start_at=${1645722000000}&end_at=${endDate}&url=/blog/${slug}`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const [data, err] = await asyncFetchJSON<ResponsePageViews>(UMAMI_DEPLOYED_URL + url, config)

    if (err) {
      return 0
    }

    const views = data.pageviews.value

    const KEY = 'page-views-of-' + slug
    const EXPIRED = 3600 // in seconds = 60 minutes
    await Promise.all([redis.set(KEY, views), redis.expire(KEY, EXPIRED)])

    return views
  }

  return parseInt(redisViews)
}

export const getPostsByTag = (posts: Post[], tag?: string) => {
  const publishedPosts = filterPublishedPost(posts)
  return match<[Post[], string | undefined], Post[] | null>([publishedPosts, tag])
    .with([P._, P.nullish], () => [])
    .with([P.nullish, P._], () => null)
    .with([P.not(P.nullish), P.string], ([posts]) => {
      return posts.filter((post) => post.tags.includes(tag ?? ''))
    })
    .exhaustive()
}
