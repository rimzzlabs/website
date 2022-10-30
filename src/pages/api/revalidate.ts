import { SECRET_KEY } from '@/libs/constants/environmentState'

import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  if (!req.query.slug) {
    return res.status(400).json({ message: 'Please provide slug to revalidate' })
  }
  if (Array.isArray(req.query.slug)) {
    return res.status(400).json({ message: 'Slug should be a string' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(req.query.slug)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

export default handler
