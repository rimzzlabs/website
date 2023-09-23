import { prisma } from '@db/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, type AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { P, match } from 'ts-pattern'

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

if (!clientId || !clientSecret) {
  throw new Error(
    'Canno find GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET, check your code at src/utils/auth.ts',
  )
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
}

export async function getUserSession() {
  try {
    const session = await getServerSession(authOptions)

    return match(session?.user)
      .with(
        { email: P.not(P.nullish), image: P.not(P.nullish), name: P.not(P.nullish) },
        (user) => {
          return user
        },
      )
      .otherwise(() => null)
  } catch (error) {
    return null
  }
}

export async function getUser() {
  try {
    const session = await getUserSession()
    if (!session) return null
    const user = await prisma.user.findUnique({
      where: {
        email: session.email,
      },
    })

    return user
  } catch (error) {
    return null
  }
}
