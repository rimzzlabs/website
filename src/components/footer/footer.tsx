'use client'

import { tw } from '@/utils/common'

import { FooterInfo } from './footer-info'
import { FooterLinks } from './footer-links'

import { usePathname } from 'next/navigation'

type FooterProps = {
  className?: string
}

export const Footer = (props: FooterProps) => {
  const pathname = usePathname()

  return (
    <footer
      className={tw(
        'layout mt-32 pb-32',
        pathname.includes('/blog/') && 'lg:max-w-5xl',
        props.className,
      )}
    >
      <FooterLinks />

      <FooterInfo />
    </footer>
  )
}
