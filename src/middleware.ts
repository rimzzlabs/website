import { type NextURL } from 'next/dist/server/web/next-url'
import { type NextRequest, NextResponse } from 'next/server'
import { match } from 'ts-pattern'

const redirect = (url: string | NextURL | URL) => NextResponse.redirect(url, 301)

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  return match(pathname)
    .with('/portfolio', () => redirect(`${url.origin}/project`))
    .otherwise(() => NextResponse.next())
}
