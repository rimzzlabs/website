import { getUser } from '@/utils/auth'
import type { TPostReactionPayload } from '@/utils/reaction'

import { badRequest, responseOK, serverError, unauthorized } from '@/api/response'

import { createReaction, getReactions } from './utils'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return badRequest({ message: 'Missing slug', slug })
  const user = await getUser()

  const [counter, error] = await getReactions({ slug, user })

  if (error) {
    return serverError({ message: 'Cannot GET reaction, please try again later', slug })
  }

  return responseOK({ data: counter, message: 'Fetch Counter success', slug })
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TPostReactionPayload | undefined
  if (!body?.name || !body.slug) {
    return badRequest({ message: 'Missing `body` or `slug`', slug: body?.slug ?? null })
  }

  const user = await getUser()
  if (!user) {
    return unauthorized({ slug: body.slug })
  }

  const ok = await createReaction({ body, user })
  if (!ok) {
    return serverError({
      message: 'Cannot create reaction, please try again later',
      slug: body.slug,
    })
  }

  return responseOK({ message: 'Reaction created successfully', slug: body.slug })
}
