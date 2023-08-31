import { getUser } from '@/utils/auth'

import { badRequest, responseOK, serverError, unauthorized } from '@/api/response'
import type { TGuestbookPayload } from '@/types/guestbook'

import { createGuestbook, deleteGuestbook, getGuestbook } from './utils'

import type { NextRequest } from 'next/server'

export async function GET() {
  const [guestbook, error] = await getGuestbook()
  if (error) {
    return serverError({ message: 'Cannot get Guestbook, please try again later' })
  }

  return responseOK({ data: guestbook })
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TGuestbookPayload
  if (!body.message) {
    return badRequest({ message: 'Cannot sign guestbook, missing `message`', messageId: null })
  }
  const user = await getUser()
  if (!user) {
    return unauthorized()
  }

  const messageId = await createGuestbook({ message: body.message, user })
  if (!messageId) {
    return serverError({ message: 'Cannot sign guestbook, please try again later', messageId })
  }

  return responseOK({ message: 'Message created successfully', messageId })
}

export async function DELETE(req: NextRequest) {
  const guestbookId = req.nextUrl.searchParams.get('guestbookId')

  if (!guestbookId) {
    return badRequest({ message: 'Cannot delete this message, missing: `guestbookId`' })
  }

  const user = await getUser()
  if (!user) {
    return unauthorized()
  }

  const ok = await deleteGuestbook({ user, guestbookId })

  if (!ok) {
    return serverError({ message: 'Cannot delete this message, please try again later' })
  }
  return responseOK({ message: 'Message deleted successfully' })
}
