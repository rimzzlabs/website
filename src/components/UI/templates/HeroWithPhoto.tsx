import { CustomImage } from '@/UI/images'

import { twclsx } from '@/libs/twclsx'

import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useMemo } from 'react'

export type HeroWithPhotoProps = {
  title: string
  subtitle: string
  description: string
  img: {
    src: string
    alt_title: string
  }
  children?: React.ReactNode
}

const toUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
}

export const HeroWithPhoto: React.FunctionComponent<HeroWithPhotoProps> = (props) => {
  const IMAGE_SRC = useMemo(() => props.img.src.replace(',tr:bl-10', ''), [props.img.src])

  return (
    <div
      className={twclsx(
        'content-auto',
        'flex flex-col pb-10 md:pb-20',
        'md:flex-row-reverse md:justify-between md:items-center',
        'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
      )}
    >
      <m.div variants={toUp} className={twclsx('relative', 'flex items-center self-start md:justify-end')}>
        <figure className='mb-4 md:mb-0 md:ml-4'>
          <CustomImage
            src={IMAGE_SRC}
            alt={props.img.alt_title}
            width={176}
            height={176}
            quality={100}
            placeholder='blur'
            blurDataURL={props.img.src}
            display='intrinsic'
            objectFit='cover'
          />
        </figure>
      </m.div>
      <section>
        <m.h1 variants={toUp}>{props.title}</m.h1>
        <m.p
          variants={toUp}
          className={twclsx(
            'max-w-max mt-2 mb-4',
            'text-transparent font-bold text-xl md:text-2xl',
            'bg-clip-text bg-gradient-to-r',
            'from-primary-500 to-ternary-500'
          )}
        >
          {props.subtitle}
        </m.p>
        <m.p variants={toUp} className={twclsx('max-w-prose', 'mb-2 md:mb-4')}>
          {props.description}
        </m.p>
        {props.children}
      </section>
    </div>
  )
}
