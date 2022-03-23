import Image from '@/components/atoms/Image'

import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface CustomImageProps {
  alt: string
  src: string
  title: string
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Image
        {...props}
        onClick={() => setIsOpen(true)}
        src={src}
        alt={alt}
        layout='intrinsic'
        width={672}
        height={400}
        className='rounded cursor-pointer'
        objectFit='cover'
        loading='lazy'
        placeholder='blur'
        blurDataURL='/blur.svg'
      />

      {isOpen && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={() => setIsOpen(false)}
          reactModalStyle={{
            maxWidth: '500px'
          }}
        />
      )}
    </>
  )
}

export default CustomImage
