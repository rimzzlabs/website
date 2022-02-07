import { ArticleHeadProps } from '@/data/articles/articleType'
import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const ARTICLE_PATH = path.join(process.cwd(), 'src/data')

/**
 * It returns an array of all the files in the directory.
 * @param {string} path - The path to the directory `required`.
 * @returns An array of strings.
 */
const getFullPath = (path: string): Array<string> => {
  return fs.readdirSync(`${ARTICLE_PATH}/${path}`).filter((p) => /\.mdx?$/.test(p))
}

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
 * It reads the file content from the file system and parses it into a JSON object.
 * @param {string} slug - The slug is the unique identifier for the portfolio.
 */
export const getPortfolioBySlug = async (slug: string) => {
  const fullpath = path.join(`${ARTICLE_PATH}/portfolio`, `${slug}.mdx`)
  const fileContent = fs.readFileSync(fullpath, 'utf8')

  const { data, content } = matter(fileContent)

  return {
    data,
    content
  }
}

/**
 * Get all the portfolio articles from the `/portfolio` directory
 * @returns An array of objects that contain the matter-parsed data and the slug.
 */
export const getPortfolio = async (): Promise<Array<PortfolioHeadProps>> => {
  const paths = getFullPath('/portfolio')

  return paths.map((p) => {
    const fullpath = path.join(`${ARTICLE_PATH}/portfolio`, p)
    const fileContent = fs.readFileSync(fullpath, 'utf8')

    const { data } = matter(fileContent)

    return {
      ...(data as PortfolioHeadProps),
      slug: p.replace('.mdx', '')
    }
  })
}

/**
 * Get all articles from the `/articles` directory and return them as an array of objects
 * @returns An array of objects that contain the matter data and the slug.
 */
export const getArticle = async (): Promise<Array<ArticleHeadProps>> => {
  const paths = getFullPath('/articles')
  return paths.map((p) => {
    const fullpath = path.join(`${ARTICLE_PATH}/articles`, p)
    const fileContent = fs.readFileSync(fullpath, 'utf8')

    const { data } = matter(fileContent)

    return {
      ...(data as ArticleHeadProps),
      slug: p.replace('.mdx', '')
    }
  })
}
