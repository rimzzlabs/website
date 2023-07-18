import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname.startsWith('/blog')) {
    revalidatePath('/blog/[slug]')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  return NextResponse.next()
}
