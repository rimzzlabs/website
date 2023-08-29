import { tw } from '@/utils/common'

import { FooterInfo } from './footer-info'
import { FooterLinks } from './footer-links'

type FooterProps = {
  className?: string
}

export const Footer = (props: FooterProps) => {
  return (
    <footer className={tw('layout mt-32 pb-32', props.className)}>
      <FooterLinks />

      <FooterInfo />
    </footer>
  )
}
