'use client'

import { tw } from '@/utils/tw'

import { FooterCopyRight } from './footer-copyright'
import { FooterLinks } from './footer-links'

import { useSelectedLayoutSegment } from 'next/navigation'
import { match } from 'ts-pattern'

type FooterProps = {
  className?: string
}

export const Footer = (props: FooterProps) => {
  const segment = useSelectedLayoutSegment()

  return match(segment)
    .with('not-found', () => null)
    .otherwise(() => (
      <footer
        className={tw(
          'layout',
          'pt-3 pb-6 mt-4',
          'border-t-2 border-t-base-300 dark:border-t-base-800',
          props.className,
        )}
      >
        <p className='text-lg font-bold mb-2'>Explore More</p>
        <FooterLinks />
        <FooterCopyRight />
      </footer>
    ))
}
