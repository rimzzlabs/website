import CustomImage from '@/components/atoms/CustomImage'

import { twclsx } from '@/libs/twclsx'

export interface HeroWithPhotoProps {
  title: string
  subtitle: string
  description: string
  img: {
    src: string
    alt_title: string
  }
  children?: React.ReactNode
}

const HeroWithPhoto: React.FunctionComponent<HeroWithPhotoProps> = ({
  title,
  subtitle,
  description,
  img,
  children
}) => {
  const IMAGE_SRC = img.src.replace(',tr:bl-10', '')
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
          alt={img.alt_title}
          width={176}
          height={176}
          quality={80}
          placeholder='blur'
          blurDataURL={img.src}
          display='intrinsic'
          objectFit='cover'
          className='rounded-full'
        />
      </figure>
      <section>
        <h1>{title}</h1>
        <p
          className={twclsx(
            'max-w-max mt-2 mb-4',
            'text-transparent font-bold text-xl md:text-2xl',
            'bg-clip-text bg-gradient-to-r',
            'from-primary-500 to-ternary-500'
          )}
        >
          {subtitle}
        </p>
        <p className={twclsx('max-w-prose', 'mb-2 md:mb-4')}>{description}</p>
        {children}
      </section>
    </div>
  )
}

export default HeroWithPhoto
