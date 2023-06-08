import { tw } from '@/utils/tw'

import { HomeSocialMedia } from './home-social-media'

import Image from 'next/image'

export const HomeHero = () => {
  return (
    <section className='flex flex-col'>
      <div className='relative flex h-14 md:h-16'>
        <Image
          priority
          width={128}
          height={128}
          quality={100}
          alt='Rizki Maulana Citra'
          title='Rizki Maulana Citra'
          src='https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp'
          className={tw(
            'absolute left-1 bottom-0.5',
            'border-4 rounded-full',
            'border-base-50 dark:border-base-900',
          )}
        />
        <HomeSocialMedia className='ml-auto max-w-max' />
      </div>

      <div className='mt-4'>
        <h1 className=''>Rizki Maulana Citra</h1>
        <p
          className={tw(
            'max-w-max mb-7',
            'text-transparent font-bold',
            'text-xl md:text-2xl',
            'bg-clip-text bg-gradient-to-r',
            'from-primary-500 to-primary-300 dark:text-transparent',
          )}
        >
          Frontend Developer
        </p>

        <div className='[&>p:not(:last-child)]:mb-3 [&>p]:max-w-prose md:pb-6'>
          <p>
            I am enthusiastic about frontend development and enjoy working on the web. I enjoy
            combining my technical skills and creativity to create entertaining and user-friendly
            websites and applications.
          </p>
          <p>
            Additionally, it&apos;s a space where I proudly showcase my personal portfolio—a
            collection of projects that highlight my dedication and expertise. Feel free to explore
            and witness firsthand the fruits of my labor. Join me on this web-driven adventure as we
            unravel the possibilities together.
          </p>
          <p>
            Let&apos;s delve into the ever-evolving realm of frontend development, where innovation
            merges with imagination, and the digital canvas awaits our unique creations.
          </p>
        </div>
      </div>
    </section>
  )
}
