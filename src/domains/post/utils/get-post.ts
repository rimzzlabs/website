import { getPostViews } from '@/domains/umami/utils'

import { getContent } from '@/utils/ssr'

import type { PostFrontMatter } from '../type'

export const getPost = async (slug: string) => {
  const path = 'src/domains/post/content/' + slug
  const post = await getContent<PostFrontMatter>(path)
  if (!post) return null

  const views = await getPostViews(post.frontMatter.slug)

  return {
    views,
    ...post,
  }
}
