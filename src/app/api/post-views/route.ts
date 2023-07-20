import { getPostViews } from '@/domains/umami/utils'

import { type NextRequest, NextResponse } from 'next/server'

type SuccesResponse = {
  message: 'Success'
  data: {
    views: number
    slug: string
  }
}

type FailedResponse = {
  message: string
  data: null
}

export type PostViewsResponseAPI = SuccesResponse | FailedResponse

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const slug = params.get('slug')

  if (!slug) {
    return NextResponse.json<PostViewsResponseAPI>(
      {
        data: null,
        message: 'Please provide blog post slug',
      },
      { status: 400, statusText: 'URL params slug should be provided' },
    )
  }

  try {
    const views = await getPostViews(slug)
    return NextResponse.json<PostViewsResponseAPI>(
      {
        message: 'Success',
        data: {
          slug,
          views,
        },
      },
      { status: 200 },
    )
  } catch (errorrr) {
    return NextResponse.json<PostViewsResponseAPI>(
      {
        data: null,
        message: 'Server error',
      },
      { status: 500 },
    )
  }
}
