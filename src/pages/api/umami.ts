import { getPageViews, getToken } from '@/services'

import { NextApiRequest, NextApiResponse } from 'next'
import { isExpired } from 'react-jwt'

export type PageViewsResponse = {
  error: boolean
  message: string
  pageviews: number | null
}

let jwt: null | string = null

const handler = async (req: NextApiRequest, res: NextApiResponse<PageViewsResponse>) => {
  if (!req.query.slug) {
    return res.status(400).json({
      error: true,
      message: 'Please provide slug',
      pageviews: null
    })
  }

  if (Array.isArray(req.query.slug)) {
    return res.status(400).json({
      error: true,
      message: 'Slug should be a string',
      pageviews: null
    })
  }
  const slug = req.query.slug
  if (!jwt) {
    const token = await getToken()
    jwt = token
  }

  if (jwt && isExpired(jwt)) {
    const token = await getToken()
    jwt = token
  }

  if (!jwt) {
    return res.status(500).json({
      error: true,
      message: 'Something went wrong, please try again later',
      pageviews: null
    })
  }

  const pv = await getPageViews(slug, jwt)

  if (pv.isError) {
    return res.status(500).json({
      pageviews: null,
      message: 'Cannot get page views, please try again later',
      error: true
    })
  }

  return res.status(200).json({
    pageviews: pv.data as number,
    message: 'Pageviews retrieved',
    error: false
  })
}

export default handler
