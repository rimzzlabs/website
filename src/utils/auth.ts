import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { type AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

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
