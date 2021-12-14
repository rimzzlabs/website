import Image from 'next/image'

type NextImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  layoutFill?: boolean
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

const NextImage = ({
  src,
  alt,
  layoutFill = false,
  fit = 'contain',
  width = 0,
  height = 0,
  className = ''
}: NextImageProps) => {
  if (!layoutFill)
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading='lazy'
        placeholder='blur'
        blurDataURL='/loader.webp'
        className={className}
      />
    )

  return (
    <Image
      layout='fill'
      src={src}
      alt={alt}
      objectFit={fit}
      loading='lazy'
      placeholder='blur'
      blurDataURL='/loader.webp'
      className={className}
    />
  )
}

export default NextImage
