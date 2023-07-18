import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const nextURL = req.nextUrl.clone()
  const url = new URL('blog/[slug]', nextURL)
  revalidatePath(url.toString())
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
