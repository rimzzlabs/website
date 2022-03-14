import { PortfolioHeadProps } from '@/data/portfolio/portfolioType'
import getFullPath, { ARTICLE_PATH } from '@/libs/helpers/getFullPath'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

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
const getPortfolio = async (): Promise<Array<PortfolioHeadProps>> => {
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

export default getPortfolio
