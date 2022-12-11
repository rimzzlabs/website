import { UMAMI, getToken } from '@/services'

import { NextApiRequest, NextApiResponse } from 'next'
import type { PageView, PageViewResponse } from 'rizkicitra'

let token: null | string | false = null

const allowedMethod = ['GET']

export default async function handler(req: NextApiRequest, res: NextApiResponse<PageViewResponse>) {
  if (req.method && !allowedMethod.includes(req.method)) {
    return res.status(405).send({ message: 'Method not allowed.', view: null })
  }

  if (!req.query.slug) return res.status(400).send({ message: 'query parameter is required', view: null })

  if (!token && token !== false) {
    const newToken = await getToken()
    if (!newToken) {
      token = false
    } else {
      token = newToken
    }
  }

  if (token === false) return res.status(500).send({ message: 'Cannot get token', view: null })

  let view = 0

  const slug = req.query.slug
  const end_date = new Date()
  const firtsDeployedAppAtMs = 1645722000000

  const config = { headers: { Authorization: 'Bearer ' + token } }

  const articleURL = `/api/website/1/stats?start_at=${firtsDeployedAppAtMs}&end_at=${end_date.getTime()}&url=/article/${slug.toString()}`
  const blogURL = `/api/website/1/stats?start_at=${firtsDeployedAppAtMs}&end_at=${end_date.getTime()}&url=/blog/${slug.toString()}`

  const settles = await Promise.allSettled([
    UMAMI.get<PageView>(articleURL, config),
    UMAMI.get<PageView>(blogURL, config)
  ])

  settles.forEach((settle) => {
    if (settle.status === 'fulfilled') {
      const prop = settle.value
      view += prop.data.pageviews.value
    }
  })

  return res.status(200).json({ message: 'Retrieved succesfully', view })
}
