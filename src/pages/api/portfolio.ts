import { getPortfolio } from '@/libs/mdx'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const portfolios = await getPortfolio()

  //   clone portfolios data to a new array, and assign to a variable "data" and sort by dates
  const data = portfolios
    .map((portfolio) => ({
      ...portfolio,
      date: new Date(portfolio.date)
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  res.status(200).json({ data })
}
