import type { PostFrontMatter, PostTag } from '../type'
import { getPosts } from './get-posts'

import { P, match } from 'ts-pattern'

export const getPostsByTag = async (tag?: string) => {
  const posts = await getPosts()

  return match([posts, tag])
    .with([P._, P.nullish], () => [] as PostFrontMatter[])
    .with([P.nullish, P._], () => null)
    .with([P.not(P.nullish), P.string], ([posts]) => {
      return posts.filter((post) => post.tags.includes(tag as PostTag))
    })
    .exhaustive()
}
