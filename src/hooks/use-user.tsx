import { useSession } from 'next-auth/react'

export const useUser = () => {
  const session = useSession()

  return session.data?.user ?? null
}
