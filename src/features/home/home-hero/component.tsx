import { CloudinaryImg } from '@/components/cloudinary-image'

import { SITE_OWNER } from '@/domains/seo'

export const HomeHero = () => {
  return (
    <section className='flex flex-col my-4'>
      <div className='flex flex-col-reverse sm:flex-row md:items-end mb-10'>
        <div className='w-full'>
          <span className='text-xl font-bold text-typo-head dark:text-typo-h-dark'>
            Hello, I&apos;m
          </span>

          <h1 className='mt-1 md:text-5xl'>{SITE_OWNER}</h1>
        </div>

        <div className='relative aspect-[.75/1] w-28 sm:w-32 mb-4 md:mb-unset md:ml-auto'>
          <CloudinaryImg
            fill
            sizes='(max-width: 640px) 112px, (min-width: 640px) 128px'
            priority
            quality={80}
            className='rounded-md dark:brightness-95'
            alt='Rizki Maulana Citra'
            title='Rizki Maulana Citra'
            publicId='rizkicitra.dev/rizkimcitra.webp'
          />
        </div>
      </div>

      <div className='prose'>
        <p>
          I&apos;m a software engineer frontend. A passionate engineer driven to craft an intuitive
          and smooth user experiences on the web.
        </p>
        <p>
          I continually explore new technologies and tools to improve my development process, and I
          keep up with the most latest enterprise trends and best practices. And by combining those
          I can build remarkable user experiences on the web.
        </p>
      </div>
    </section>
  )
}
