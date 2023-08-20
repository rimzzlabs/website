import { useSession } from 'next-auth/react'
import { P, match } from 'ts-pattern'

export const useAuth = () => {
  const session = useSession()

  return match(session)
    .with(
      P.not(P.nullish)
        .and({ status: 'authenticated' })
        .and({ data: { user: P.not(P.nullish).select() } }),
      (user) => {
        const data = {
          email: user.email as string,
          name: user.name as string,
          image: user.image as string,
        }
        return [data, true] as const
      },
    )
    .otherwise(() => [null, false] as const)
}
