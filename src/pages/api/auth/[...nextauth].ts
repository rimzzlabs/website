import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export default NextAuth({
  secret: process.env.SECRET_KEY,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
})
