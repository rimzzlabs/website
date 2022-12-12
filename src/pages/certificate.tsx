import { WrappedImage } from '@/UI/images'
import { Hero, LayoutPage } from '@/UI/templates'

import ALBUMS from '@/libs/constants/certificate'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { twclsx } from '@/libs/twclsx'

import { useMediaQuery } from '@/hooks'

import type { NextPage } from 'next'
import { useCallback, useEffect, useId, useState } from 'react'
import Lightbox from 'react-image-lightbox'

const meta = getMetaPage({
  title: 'Certificate',
  description:
    "A collection of certificates I've earned, most of them are from finishing a course, you might want to take a look, click the certificate to zoom in.",
  keywords: ['certificate', 'certificates', 'rizkicitra.dev'],
  og_image: generateOgImage({
    title: 'Certificate',
    subTitle: "A collection of certificate I've earned",
    theme: 'dark'
  }),
  og_image_alt: 'Certificate — rizkicitra.dev',
  slug: '/certificate',
  type: 'website'
})

const CertificatePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currImage, setCurrImage] = useState(0)
  const id = useId()

  const isMatch = useMediaQuery('(min-width: 768px)')
  const handleClick = useCallback((newValue: number) => {
    setIsOpen((prev) => !prev)
    setCurrImage(newValue)
  }, [])

  const onCloseRequest = useCallback(() => setIsOpen(false), [])
  const onPrevImage = useCallback(() => setCurrImage((prev) => (prev === 0 ? ALBUMS.length - 1 : prev - 1)), [])
  const onNextImage = useCallback(() => setCurrImage((prev) => (prev === ALBUMS.length - 1 ? 0 : prev + 1)), [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement

      if (isOpen) {
        html.classList.add('overflow-hidden')
        html.classList.add('sm:pr-3.5')
      }

      if (html.classList.contains('overflow-hidden') && !isOpen) {
        html.classList.remove('overflow-hidden')
        html.classList.remove('sm:pr-3.5')
      }
    }
  }, [isOpen])

  return (
    <LayoutPage {...meta}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <section
        className={twclsx('content-auto', 'w-full grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto pb-8 md:pb-16')}
      >
        {ALBUMS.map((prop, index) => (
          <WrappedImage
            fill
            loading='lazy'
            src={prop.src}
            parentStyle='w-full h-56'
            key={`${id}-${prop.title}`}
            onClick={() => handleClick(index)}
            alt={`${prop.title} certificate`}
            title={`${prop.title} certificate`}
            className={twclsx('object-cover', 'cursor-pointer motion-safe:hover:brightness-75', 'transition-all')}
          />
        ))}
      </section>

      {isOpen && (
        <div className='relative w-full'>
          <Lightbox
            mainSrc={ALBUMS[currImage].src}
            onMovePrevRequest={onPrevImage}
            onMoveNextRequest={onNextImage}
            prevSrc={ALBUMS[(currImage + ALBUMS.length - 1) % ALBUMS.length].src}
            nextSrc={ALBUMS[(currImage + 1) % ALBUMS.length].src}
            onCloseRequest={onCloseRequest}
            imageTitle={isMatch && ALBUMS[currImage].title}
            imageCaption={!isMatch && ALBUMS[currImage].title}
            imagePadding={isMatch ? 100 : 10}
            reactModalStyle={{
              maxWidth: '500px'
            }}
          />
        </div>
      )}
    </LayoutPage>
  )
}

export default CertificatePage
