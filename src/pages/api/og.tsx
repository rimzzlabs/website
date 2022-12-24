/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge'
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0) : 'Edge OG with dynamic title'

    return new ImageResponse(
      (
        <div tw='flex items-center h-[600px] w-full py-3 px-5 bg-gray-800 text-zinc-200'>
          <div tw='flex flex-col h-full w-1/2 justify-between'>
            <p tw='font-bold text-3xl text-blue-500'>https://rizkicitra.dev/blog</p>
            <p tw='font-extrabold text-6xl'>{title}</p>
            <div tw='flex items-center'>
              <img
                width='44'
                height='44'
                tw='rounded-full'
                style={{
                  objectFit: 'cover'
                }}
                src='https://ik.imagekit.io/mlnzyx/attachment/rizkimcitra.webp'
                alt='Rizki M Citra'
              />
              <p tw='ml-2.5 font-bold text-4xl'>Rizki M Citra</p>
            </div>
          </div>

          <div tw='flex items-center justify-center w-1/2 h-full'>
            <img src='https://ik.imagekit.io/mlnzyx/attachment/logo.png' alt='logo' width={192} height={192} />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600
      }
    )
  } catch (err) {
    return new Response('Failed to generate the og image', {
      status: 500,
      statusText: 'failed to generate the og image'
    })
  }
}
