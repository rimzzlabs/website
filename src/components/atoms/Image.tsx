import NextImage, { ImageProps } from 'next/image'

const Image: React.FC<ImageProps> = ({ src, layout, ...props }) => (
  <NextImage src={src} layout={layout ?? 'fill'} objectFit={props.objectFit ?? 'cover'} {...props} />
)

export default Image
