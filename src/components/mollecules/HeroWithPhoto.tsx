import Image from '@/components/atoms/Image'

import clsx from 'clsx'

export interface HeroWithPhotoProps {
  title: string
  subtitle: string
  description: string
  img: {
    src: string
    alt_title: string
  }
}

const HeroWithPhoto: React.FunctionComponent<HeroWithPhotoProps> = ({ title, subtitle, description, img }) => {
  return (
    <div
      className={clsx(
        'flex flex-col pb-10 md:pb-20',
        'md:flex-row-reverse md:justify-between md:items-center',
        'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
      )}
    >
      <figure className={clsx('flex items-center md:justify-end self-start', 'mb-4 md:mb-0')}>
        <div className='relative w-20 md:w-36 h-20 md:h-36'>
          <Image
            title={img.alt_title}
            layout='fill'
            alt={img.alt_title}
            className='rounded-full'
            src={img.src}
            loading='lazy'
            placeholder='blur'
            quality={70}
            blurDataURL='/blur.svg'
          />
        </div>
      </figure>
      <section>
        <h1>{title}</h1>
        <p
          className={clsx(
            'max-w-max my-3 md:my-4',
            'text-transparent font-bold text-xl md:text-2xl',
            'bg-clip-text bg-gradient-to-r',
            'from-primary-500 to-ternary-500'
          )}
        >
          {subtitle}
        </p>
        <p className='max-w-prose mb-2 md:mb-4'>{description}</p>
      </section>
    </div>
  )
}

export default HeroWithPhoto
