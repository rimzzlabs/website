import { responseJSON } from '@/utils/response-json'

import { createReaction, getReactions } from './utils'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) return responseJSON({ message: 'Missing slug' }, 400)

  return getReactions(req, slug)
}

export async function POST(req: NextRequest) {
  return createReaction(req)
}
