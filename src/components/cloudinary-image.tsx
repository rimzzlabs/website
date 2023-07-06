import { CldOptions } from '@cld-apis/types'
import buildUrl from 'cloudinary-build-url'
import Image, { ImageProps } from 'next/image'
import { forwardRef } from 'react'

type ImagePropsOmit = Omit<Omit<Omit<ImageProps, 'title'>, 'src'>, 'alt'>
type Props = ImagePropsOmit & {
  title: string
  alt: string
  publicId: string
  buildUrlProps?: CldOptions
}

export const CloudinaryImg = forwardRef<HTMLImageElement, Props>(
  ({ publicId, buildUrlProps, ...props }, ref) => {
    const src = buildUrl(publicId, {
      ...buildUrlProps,
      cloud: {
        ...buildUrlProps?.cloud,
        cloudName: 'rizkicitra',
      },
    })
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image src={src} ref={ref} {...props} />
  },
)

CloudinaryImg.displayName = 'CloudinaryImg'
