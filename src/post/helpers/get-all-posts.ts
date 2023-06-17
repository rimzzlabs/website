import { compareDesc } from '@/utils/date'
import { getContents } from '@/utils/ssr/get-contents'

import { PostFrontMatter } from '../contents/type'

export const getAllPosts = async () => {
  const res = await getContents<PostFrontMatter>('post', 'contents')

  return res
    .sort((a, b) =>
      compareDesc(new Date(a.frontMatter.published), new Date(b.frontMatter.published)),
    )
    .slice(0, 3)
}
