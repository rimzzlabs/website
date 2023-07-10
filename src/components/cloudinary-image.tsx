import type { CldOptions } from '@cld-apis/types'
import buildUrl from 'cloudinary-build-url'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { forwardRef } from 'react'

type ImagePropsExtended = Omit<ImageProps, 'src'>

type Props = ImagePropsExtended & {
  title: string
  alt: string
  publicId: string
  buildUrlProps?: CldOptions
}

type CloudinaryImgAbsoluteProps = Props & {
  width: ImageProps['width']
  height: ImageProps['height']
}

type CloudinaryImgFillProps = Props & {
  fill: boolean
  sizes: string
}

type P = CloudinaryImgAbsoluteProps | CloudinaryImgFillProps

export const CloudinaryImg = forwardRef<HTMLImageElement, P>(
  ({ publicId, buildUrlProps, ...props }, ref) => {
    const src = buildUrl(publicId, {
      ...buildUrlProps,
      cloud: {
        ...buildUrlProps?.cloud,
        cloudName: 'rizkicitra',
      },
    })
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...props} src={src} ref={ref} />
  },
)

CloudinaryImg.displayName = 'CloudinaryImg'
