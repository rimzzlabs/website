import type { ImageResponseOptions } from 'next/server'
import { ImageResponse } from 'next/server'

type generateOgImageParams = {
  title: string
  description: string
}

export const generateOgImage = (
  params: generateOgImageParams,
  options?: ImageResponseOptions & ResponseInit,
) => {
  return new ImageResponse(
    (
      <div tw='flex flex-col w-full h-full items-center justify-center bg-gray-900 text-white'>
        <p tw='font-bold text-5xl md:text-8xl lg:text-9xl mb-4'>{params.title}</p>
        <p tw='text-lg sm:text-xl md:text-2xl'>{params.description}</p>
      </div>
    ),
    options,
  )
}
