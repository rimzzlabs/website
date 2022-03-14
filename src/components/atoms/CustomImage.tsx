import Image from '@/components/atoms/Image'

interface CustomImageProps {
  alt: string
  src: string
  title: string
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      layout='intrinsic'
      width={672}
      height={400}
      className='rounded'
      objectFit='cover'
      loading='lazy'
    />
  )
}

export default CustomImage
