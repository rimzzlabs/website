import { WrappedImage } from '@/UI/images'

import { twclsx } from '@/libs/twclsx'

import type { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface ContentImageProps extends ImageProps {
  alt: string
  src: string
  title: string
}

export const ContentImage = ({ src, alt, ...props }: ContentImageProps) => {
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
      <WrappedImage
        onClick={() => setIsOpen(true)}
        src={src}
        alt={alt}
        width={768}
        height={468}
        className={twclsx('rounded-lg', 'cursor-pointer object-cover')}
        {...props}
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
