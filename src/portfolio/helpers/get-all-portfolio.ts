import { compareDesc } from '@/utils/date'
import { getContents } from '@/utils/ssr'

import { PortfolioFrontMatter } from '../contents/type'

export const getAllPortfolios = async () => {
  const res = await getContents<PortfolioFrontMatter>('portfolio', 'contents')

  return res
    .sort((a, b) => {
      return compareDesc(new Date(a.frontMatter.created_at), new Date(b.frontMatter.created_at))
    })
    .slice(0, 3)
}
