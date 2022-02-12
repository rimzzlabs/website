import clsx from 'clsx'
import NextImage, { ImageProps } from 'next/image'

export type BlogImageProps = {
  alt: string
  aspect?: 'aspect-square' | 'aspect-video'
} & ImageProps

const BlogImage: React.FC<BlogImageProps> = ({ src, alt, aspect, ...props }) => {
  return (
    <figure className={clsx('relative w-full', aspect ?? 'aspect-video')}>
      <NextImage
        {...props}
        src={src}
        alt={alt}
        layout='fill'
        loading='lazy'
        placeholder='blur'
        className='rounded'
        objectFit={props.objectFit ?? 'cover'}
        blurDataURL='/icon-512x512.png'
      />
    </figure>
  )
}

export default BlogImage
