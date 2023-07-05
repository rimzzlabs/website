import { compareDesc } from '@/utils/date'
import { getContents } from '@/utils/ssr'

import { PostFrontMatter } from '../type'

export const getPosts = async () => {
  try {
    const posts = await getContents<PostFrontMatter>('src/domains/post/content')

    return posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  } catch (err) {
    return null
  }
}
