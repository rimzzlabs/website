'use client'

import { tw } from '@/utils/tw'

import Image from 'next/image'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

export const HomeHeroImage = () => (
  <Gallery withCaption>
    <Item
      height={640}
      width={640}
      alt='Rizki Maulana Citra'
      caption='Rizki Maulana Citra'
      thumbnail='https://ik.imagekit.io/mlnzyx/attachment/tr:w-128,h-128,f-auto/rizkimcitra.webp'
      original='https://ik.imagekit.io/mlnzyx/attachment/tr:w-640,h-640,f-auto/rizkimcitra.webp'
    >
      {(prop) => {
        return (
          <Image
            ref={prop.ref as React.Ref<HTMLImageElement>}
            onClick={prop.open}
            priority
            width={128}
            height={128}
            quality={100}
            alt='Rizki Maulana Citra'
            title='Rizki Maulana Citra'
            src='https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp'
            className={tw(
              'absolute left-1 bottom-0.5',
              'border-4 rounded-full cursor-pointer',
              'border-base-50 dark:border-base-950',
            )}
          />
        )
      }}
    </Item>
  </Gallery>
)
