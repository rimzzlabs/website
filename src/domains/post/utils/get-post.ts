import { getPostViews } from '@/domains/umami/utils'

import { getContent } from '@/utils/ssr'

import type { PostFrontMatter } from '../type'

export const getPost = async (slug: string) => {
  const path = 'src/domains/post/content/' + slug
  const [post, error] = await getContent<PostFrontMatter>(path)
  const views = await getPostViews(slug)

  if (error) return [null, error] as const

  return [{ ...post, views }, error] as const
}
