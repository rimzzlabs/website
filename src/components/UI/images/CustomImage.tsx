import Image from 'next/image'
import type { ImageProps } from 'next/image'

type CustomImageProps = {
  display: 'responsive' | 'intrinsic'
  alt: string
} & ImageProps

export const CustomImage: React.FunctionComponent<CustomImageProps> = ({
  src,
  alt,
  width = 144,
  height = 144,
  display = 'intrinsic',
  ...props
}) => {
  if (display === 'responsive') {
    return (
      <Image
        fill
        src={src}
        alt={alt}
        title={alt}
        loading='lazy'
        placeholder='blur'
        blurDataURL={props.blurDataURL ?? '/blur.svg'}
        {...props}
      />
    )
  }

  if (typeof width === 'number' && width < 40 && typeof height === 'number' && height < 40) {
    return <Image src={src} alt={alt} title={alt} width={width} height={height} {...props} />
  }

  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      loading='lazy'
      placeholder='blur'
      blurDataURL={props.blurDataURL ?? '/blur.svg'}
      {...props}
    />
  )
}
