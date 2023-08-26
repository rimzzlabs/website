import { createReaction, getReactions } from './utils'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  return getReactions(slug)
}

export async function POST(req: NextRequest) {
  return createReaction(req)
}
