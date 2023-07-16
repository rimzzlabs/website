import { redis } from '@/utils/ssr'

import { P, match } from 'ts-pattern'

export const getViewsFromRedis = async (slug: string) => {
  const views = await redis.get('PAGE_VIEWS_' + slug)
  return match(views)
    .with(P.nullish, (n) => n)
    .otherwise((value) => parseInt(value))
}
