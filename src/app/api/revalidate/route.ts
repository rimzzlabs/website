import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  revalidatePath('/blog/[slug]')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
