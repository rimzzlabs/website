import { getContent } from '@/utils/ssr'

import { PostFrontMatter } from '../type'

export const getPost = async (slug: string) => {
  const path = 'src/domains/post/content/' + slug
  return await getContent<PostFrontMatter>(path)
}
