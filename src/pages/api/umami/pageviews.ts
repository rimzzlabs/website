import { getPageViews } from '@/helpers/getPageViews'

import { NextApiRequest, NextApiResponse } from 'next'

interface HandlerResponse {
  status: boolean
  data: unknown
  message?: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<HandlerResponse>) => {
  const slug = req.query.slug as string
  if (!slug) {
    return res.status(400).send({
      status: false,
      message: 'please provide slug, eg: /blog/hi-man',
      data: null
    })
  }

  try {
    const pv = await getPageViews(slug)
    if (pv.isError) {
      return res.status(500).send({
        status: false,
        data: null,
        message: 'An error accoured getting pageviews'
      })
    }

    return res.status(200).send({
      status: true,
      data: pv.data,
      message: 'Fetch succesfully'
    })
  } catch (error) {
    return res.status(500).send({
      status: false,
      data: null,
      message: 'An error accoured getting pageviews'
    })
  }
}
