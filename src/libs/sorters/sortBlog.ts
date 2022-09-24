import type { Blog } from 'rizkicitra'

/**
 * It takes two blog posts and returns 1 if the first blog post is newer than the second, -1 if the
 * second blog post is newer than the first, and 0 if they are the same age
 * @param {Blog} a - Blog - the first blog
 * @param {Blog} b - Blog - the current blog
 * @returns a number.
 */
export const getNewestBlog = (a: Blog, b: Blog) => {
  return new Date(a.published) < new Date(b.published) ? 1 : new Date(a.published) > new Date(b.published) ? -1 : 0
}

/**
 * If both blogs have 0 views, return 0. Otherwise, return 1 if the first blog has less views than the
 * second blog, -1 if the first blog has more views than the second blog, and 0 if they have the same
 * number of views
 * @param {Blog} a - Blog
 * @param {Blog} b - Blog - the second blog to compare
 * @returns a number.
 */
export const getMostPopularBlog = (a: Blog, b: Blog) => {
  const aviews = a.views as number
  const bviews = b.views as number

  if (aviews === 0 && bviews === 0) {
    return 0
  }
  return aviews < bviews ? 1 : aviews > bviews ? -1 : 0
}
