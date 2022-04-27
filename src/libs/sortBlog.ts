import { Blogs } from '@/data/blog/blog.type'

export const getNewestBlog = (a: Blogs, b: Blogs) => {
  return new Date(a.published) < new Date(b.published) ? 1 : new Date(a.published) > new Date(b.published) ? -1 : 0
}

export const getMostPopularBlog = (a: Blogs, b: Blogs) => {
  return a.views && b.views ? (a.views < b.views ? 1 : a.views > b.views ? -1 : 0) : 0
}
