'use client'

import { useTheme } from '@/hooks/use-theme'

import Image from 'next/image'
import { match } from 'ts-pattern'

export const FooterInfo = () => {
  const { actualTheme } = useTheme()

  const NextJsImage = match(actualTheme)
    .with('dark', () => '/brands/nextjs-white.svg')
    .otherwise(() => '/brands/nextjs-dark.svg')
  const VercelImage = match(actualTheme)
    .with('dark', () => '/brands/vercel-white.svg')
    .otherwise(() => '/brands/vercel-dark.svg')

  return (
    <div className='flex flex-col sm:flex-row sm:items-center mt-4 sm:space-x-2 text-xs xs:text-sm text-base-500 dark:text-base-500'>
      <div className='inline-flex space-x-1 mb-2 sm:mb-0'>
        <span>Site powered by</span>
        <Image
          loading='lazy'
          src={NextJsImage}
          height={8}
          width={46}
          alt='Next.js'
          title='Next.js Brand'
        />
      </div>

      <span className='hidden sm:block'>—</span>

      <div className='inline-flex space-x-1'>
        <span> Deployed on</span>
        <Image
          loading='lazy'
          src={VercelImage}
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
