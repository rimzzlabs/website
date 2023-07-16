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
          'pt-8 pb-6 mt-16',
          'border-t border-t-base-200 dark:border-t-base-900',
          props.className,
        )}
      >
        <FooterLinks />
        <FooterCopyRight />
      </footer>
    ))
}
