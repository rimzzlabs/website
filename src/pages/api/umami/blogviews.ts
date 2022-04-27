import { getPageViews } from '@/helpers/getPageViews'

import { NextApiRequest, NextApiResponse } from 'next'

type ReturnValue = {
  status: boolean
  message: string
  data: number | null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<ReturnValue>) => {
  // check for query parameter named slug
  const slug = req.query.slug as string

  // if there is no slug, return bad request
  if (!slug) {
    return res.status(400).send({
      data: null,
      status: false,
      message: 'Pass slug as query params, e.g: /hello-world'
    })
  }

  // run getPageViews function and pass the slug
  const response = await getPageViews(slug)

  // if there is an error when trying to get the data, return 500
  if (response.isError) {
    return res.status(500).send({
      data: null,
      status: false,
      message: 'An error accoured getting blogviews data'
    })
  }

  return res.status(200).send({
    data: response.data,
    status: true,
    message: 'Fetch succesfully'
  })
}
