import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'

import { DATA_DIR, getDirectory } from './getDirectory'

import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

export const getPortfolioBySlug = async (slug: string) => {
  const dir = path.join(`${DATA_DIR}/portfolio`, `${slug}.mdx`)
  const file = await fs.readFile(dir, 'utf8')

  const { data, content } = matter(file)

  return {
    header: {
      ...(data as PortfolioHeadProps),
      slug
    },
    content
  }
}

const getPortfolio = async (): Promise<Array<PortfolioHeadProps>> => {
  const paths = await getDirectory('/portfolio')

  const files = paths.map(async (p) => {
    const fullpath = path.join(`${DATA_DIR}/portfolio`, p)
    const fileContent = await fs.readFile(fullpath, 'utf8')

    const { data } = matter(fileContent)

    return {
      ...(data as PortfolioHeadProps),
      slug: p.replace('.mdx', '')
    }
  })

  return await Promise.all(files)
}

export default getPortfolio
