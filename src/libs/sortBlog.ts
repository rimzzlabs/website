import { Blogs } from '@/data/blog/blog.type'

export const getNewestBlog = (a: Blogs, b: Blogs) => {
  return new Date(a.published) < new Date(b.published) ? 1 : new Date(a.published) > new Date(b.published) ? -1 : 0
}
