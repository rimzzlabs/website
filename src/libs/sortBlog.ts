import type { Blog } from 'rizkicitra'

export const getNewestBlog = (a: Blog, b: Blog) => {
  return new Date(a.published) < new Date(b.published) ? 1 : new Date(a.published) > new Date(b.published) ? -1 : 0
}

export const getMostPopularBlog = (a: Blog, b: Blog) => {
  const aviews = a.views as number
  const bviews = b.views as number

  if (aviews === 0 && bviews === 0) {
    return 0
  }
  return aviews < bviews ? 1 : aviews > bviews ? -1 : 0
}
