import { ArticleHeadProps } from '@/data/articles/article.type'
import getFullPath, { ARTICLE_PATH } from '@/libs/helpers/getFullPath'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

/**
 * It reads the markdown file and returns the data and content.
 * @param {string} slug - The slug is the name of the article file without the file extension.
 */
export const getArticleBySlug = async (slug: string) => {
  const fullpath = path.join(`${ARTICLE_PATH}/articles`, `${slug}.mdx`)
  const fileContent = fs.readFileSync(fullpath, 'utf8')

  const { data, content } = matter(fileContent)

  return {
    data,
    content
  }
}

/**
 * Get all articles from the `/articles` directory and return them as an array of objects
 * @returns An array of objects that contain the matter data and the slug.
 */
const getArticle = async (): Promise<Array<ArticleHeadProps>> => {
  const paths = getFullPath('/articles')
  return paths.map((p) => {
    const fullpath = path.join(`${ARTICLE_PATH}/articles`, p)
    const fileContent = fs.readFileSync(fullpath, 'utf8')

    const { data, content } = matter(fileContent)

    return {
      ...(data as ArticleHeadProps),
      slug: p.replace('.mdx', ''),
      content
    }
  })
}

export default getArticle
