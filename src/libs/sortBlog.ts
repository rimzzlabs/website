import { Blogs } from '@/data/blog/blog.type'

export const getNewestBlog = (a: Blogs, b: Blogs) => {
  return new Date(a.published) < new Date(b.published) ? 1 : new Date(a.published) > new Date(b.published) ? -1 : 0
}

export const getMostPopularBlog = (a: Blogs, b: Blogs) => {
  const aviews = a.views as number
  const bviews = b.views as number

  if (aviews === 0 && bviews === 0) {
    return 0
  }
  return aviews < bviews ? 1 : aviews > bviews ? -1 : 0
}
