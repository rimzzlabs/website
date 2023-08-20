import { OG } from '@/constants/seo'

import type { NextRequest } from 'next/server'
import { ImageResponse, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title')

  if (!title)
    return NextResponse.json(
      {
        message: 'Please provide title',
      },
      { status: 400 },
    )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 130px',
          backgroundImage: `url(${OG.dynamic})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            color: '#fff',
            whiteSpace: 'pre-wrap',
            width: '100%',
            display: 'block',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    },
  )
}
