import useMediaQuery from '@/hooks/useMediaQuery'
import { twclsx } from '@/libs/twclsx'

import CustomImage from '../atoms/CustomImage'

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
  const mdscreen = useMediaQuery('(min-width: 768px)')
  return (
    <div
      className={twclsx(
        'flex flex-col pb-10 md:pb-20',
        'md:flex-row-reverse md:justify-between md:items-center',
        'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
      )}
    >
      <figure className={twclsx('flex items-center md:justify-end self-start md:w-1/2', 'mb-4 md:mb-0')}>
        <CustomImage
          src={img.src}
          alt={img.alt_title}
          width={mdscreen ? 144 : 112}
          height={mdscreen ? 144 : 112}
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
