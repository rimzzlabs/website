import CustomImage from '@/components/atoms/CustomImage'

import { twclsx } from '@/libs/twclsx'

import { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface ContentImageProps extends ImageProps {
  alt: string
  src: string
  title: string
}

const ContentImage = ({ src, alt, ...props }: ContentImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const title = props.title ?? 'an image of' + alt

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
      <CustomImage
        display='intrinsic'
        onClick={() => !title.startsWith('nl') && setIsOpen(true)}
        src={src}
        alt={alt}
        width={768}
        height={468}
        objectFit='cover'
        className={twclsx('rounded-lg', !title.startsWith('nl') && 'cursor-pointer')}
        {...props}
      />

      {isOpen && !props.title.startsWith('nl') ? (
        <Lightbox
          mainSrc={src}
          onCloseRequest={() => setIsOpen(false)}
          reactModalStyle={{
            maxWidth: '500px'
          }}
        />
      ) : null}
    </>
  )
}

export default ContentImage
