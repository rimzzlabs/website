import { formatToISO } from '@/utils/date'
import { SITE_URL } from '@/utils/env/client'

import { ALL_ROUTES } from '@/constants/route'

import { allPosts } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { P, match } from 'ts-pattern'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const route_posts = match(allPosts)
    .with(P.nullish, () => null)
    .with(P.not(P.nullish), (posts) =>
      posts.map((post) => ({
        url: new URL(`blog/${post.slug}`, SITE_URL).href,
        lastModified: formatToISO(post.publishedAt).split('T')[0],
      })),
    )
    .exhaustive()

  const routes = ALL_ROUTES.map(({ href }) =>
    match(href)
      .with(P.shape('/'), () => ({
        url: SITE_URL,
        lastModified: formatToISO(new Date()).split('T')[0],
      }))
      .otherwise(() => ({
        url: new URL(href.slice(1), SITE_URL).href,
        lastModified: formatToISO(new Date()).split('T')[0],
      })),
  )

  return match([allPosts, routes, route_posts])
    .with([P.not(P.nullish), P._, P.not(P.nullish)], ([, routes, posts]) => [...routes, ...posts])
    .otherwise(() => routes)
}
