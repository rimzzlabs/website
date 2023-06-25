import { compareDesc } from '@/utils/date'
import { getContents } from '@/utils/ssr'

import { PostFrontMatter } from './type'

export const getPosts = async () => {
  const res = await getContents<PostFrontMatter>('src/domains/post/content')

  return res.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}
