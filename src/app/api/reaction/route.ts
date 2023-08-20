import { getReactions, postReaction } from '@/utils/reaction'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const slug = url.searchParams.get('slug')

  return getReactions(req, slug)
}

export async function POST(req: NextRequest) {
  return await postReaction(req)
}
