import { CustomImage } from '@/UI/images'

import { twclsx } from '@/libs/twclsx'

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
      <figure
        className={twclsx(
          'w-[6rem] h-[6rem]',
          'md:w-[10rem] md:h-[10rem]',
          'relative',
          'flex items-center self-start md:justify-end',
          'mb-4 md:mb-0 md:ml-4'
        )}
      >
        <CustomImage
          src={IMAGE_SRC}
          alt={props.img.alt_title}
          width={176}
          height={176}
          quality={80}
          placeholder='blur'
          blurDataURL={props.img.src}
          display='intrinsic'
          objectFit='cover'
          className='rounded-full'
        />
      </figure>
      <section>
        <h1>{props.title}</h1>
        <p
          className={twclsx(
            'max-w-max mt-2 mb-4',
            'text-transparent font-bold text-xl md:text-2xl',
            'bg-clip-text bg-gradient-to-r',
            'from-primary-500 to-ternary-500'
          )}
        >
          {props.subtitle}
        </p>
        <p className={twclsx('max-w-prose', 'mb-2 md:mb-4')}>{props.description}</p>
        {props.children}
      </section>
    </div>
  )
}
