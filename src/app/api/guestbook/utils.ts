import { formatDateToISO } from '@/utils/date'

import type { TGuestbook, TGuestbookPayload } from '@/types/guestbook'

import { prisma } from '@db/prisma'
import type { User } from '@prisma/client'

export async function getGuestbook() {
  try {
    const res = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        message: true,
        User: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    })

    const guestbook = res.map<TGuestbook>((item) => ({
      ...item,
      createdAt: formatDateToISO(item.createdAt),
    }))

    return [guestbook, null] as const
  } catch (error) {
    return [null, error as Error] as const
  }
}

export async function createGuestbook(payload: TGuestbookPayload & { user: User }) {
  try {
    const res = await prisma.guestbook.create({
      data: {
        message: payload.message,
        userId: payload.user.id,
      },
    })
    return res.id
  } catch (error) {
    return null
  }
}

type TPayload = {
  guestbookId: string
  user: User
}
export async function deleteGuestbook(payload: TPayload) {
  try {
    await prisma.guestbook.delete({
      where: {
        id: payload.guestbookId,
        userId: payload.user.id,
      },
    })
    return true
  } catch (error) {
    return false
  }
}
