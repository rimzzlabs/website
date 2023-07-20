'use server'

import { prisma } from '@/utils/ssr/prisma-client'

import { getSession } from '../actions'

import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

type PostCommentPayload = {
  body: string
  slug: string
}

export const postComment = async (payload: PostCommentPayload) => {
  const session = await getSession()

  const user_email = session?.user?.email
  const user_image = session?.user?.image
  const user_name = session?.user?.name

  if (session && user_email && user_image && user_name) {
    await prisma.comment.create({
      data: {
        ...payload,
        user_email,
        user_image,
        user_name,
        uuid: nanoid(60),
      },
    })

    revalidatePath('/blog/[slug]')
  }
}
