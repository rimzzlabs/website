import useMediaQuery from '@/hooks/useMediaQuery'

import CustomImage from '../atoms/CustomImage'

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
  const mdscreen = useMediaQuery('(min-width: 768px)')
  return (
    <div
      className={clsx(
        'flex flex-col pb-10 md:pb-20',
        'md:flex-row-reverse md:justify-between md:items-center',
        'space-y-4 md:space-y-0 md:space-x-3 md:space-x-reverse'
      )}
    >
      <figure className={clsx('flex items-center md:justify-end self-start', 'mb-4 md:mb-0')}>
        <CustomImage
          src={img.src}
          alt={img.alt_title}
          width={mdscreen ? 168 : 96}
          height={mdscreen ? 168 : 96}
          display='intrinsic'
          className='rounded-full'
        />
      </figure>
      <section>
        <h1>{title}</h1>
        <p
          className={clsx(
            'max-w-max mt-2 mb-4',
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
