import Image from '@/components/atoms/Image'

import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface ContentImageProps {
  alt: string
  src: string
  title: string
}

const ContentImage: React.FC<ContentImageProps> = ({ src, alt, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement

      if (isOpen) html.classList.add('overflow-hidden')

      if (html.classList.contains('overflow-hidden') && !isOpen) {
        html.classList.remove('overflow-hidden')
      }
    }
  }, [isOpen])

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

export default ContentImage
