'use server'

import { auth } from '@/utils/ssr'

export const getSession = async () => {
  const session = await auth()
  if (!session || !session.user?.name) return null

  return session
}
