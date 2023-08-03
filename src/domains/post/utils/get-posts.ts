import { compareDesc } from '@/utils/date'
import { getContents } from '@/utils/ssr'

import type { PostFrontMatter } from '../type'

export const getPosts = async () => {
  const [posts, error] = await getContents<PostFrontMatter>('src/domains/post/content')
  if (error) return []

  return posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}
