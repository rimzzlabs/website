import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends ImageProps {
  display: 'responsive' | 'intrinsic'
  alt: string
}

const CustomImage: React.FunctionComponent<CustomImageProps> = ({
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
        layout='fill'
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

  if (width < 40 && height < 40) {
    return <Image layout='intrinsic' src={src} alt={alt} title={alt} width={width} height={height} {...props} />
  }

  return (
    <Image
      layout='intrinsic'
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

export default CustomImage
