import Image from 'next/image'

export const FooterInfo = () => {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center mt-4 sm:space-x-2 text-xs xs:text-sm text-base-500 dark:text-base-500'>
      <div className='inline-flex items-center space-x-1 mb-2 sm:mb-0'>
        <span>Site powered by</span>
        <Image
          className='aspect-video dark:invert'
          loading='lazy'
          src='/brands/nextjs-dark.svg'
          height={8}
          width={46}
          alt='Next.js'
          title='Next.js Brand'
        />
      </div>

      <span className='hidden sm:block'>—</span>

      <div className='inline-flex items-center space-x-1'>
        <span> Deployed on</span>
        <Image
          className='aspect-video dark:invert'
          loading='lazy'
          src='/brands/vercel-dark.svg'
          height={8}
          width={54}
          alt='Vercel'
          title='Vercel Brand'
        />
        .
      </div>
    </div>
  )
}
