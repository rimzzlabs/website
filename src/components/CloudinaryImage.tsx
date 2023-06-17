import buildUrl from 'cloudinary-build-url'
import Image, { ImageProps } from 'next/image'
import { forwardRef } from 'react'

type ImagePropsOmit = Omit<Omit<Omit<ImageProps, 'title'>, 'src'>, 'alt'>
type Props = ImagePropsOmit & {
  title: string
  alt: string
}

export const CloudinaryImg = forwardRef<HTMLImageElement, Props>((props, ref) => {
  const src = buildUrl('rizkicitra.dev/post-thumbnail/improving-react-performance.jpg', {
    cloud: {
      cloudName: 'rizkicitra',
    },
    transformations: {
      resize: {
        type: 'scale',
        width: 500,
        height: 500,
      },
    },
  })
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image src={src} ref={ref} {...props} />
})

CloudinaryImg.displayName = 'CloudinaryImg'
