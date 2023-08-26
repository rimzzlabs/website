import { tw } from '@/utils/common'

import { CustomLink } from '../custom-link'
import { FooterCopyRight } from './footer-copyright'
import { FooterLinks } from './footer-links'

type FooterProps = {
  className?: string
}

export const Footer = (props: FooterProps) => {
  return (
    <footer
      className={tw(
        'layout',
        'pt-8 pb-6 mt-16',
        'border-t border-t-base-200 dark:border-t-base-900',
        props.className,
      )}
    >
      <div className='flex items-center justify-between space-x-2'>
        <FooterLinks />
        <CustomLink
          variant='unstyled'
          target='_blank'
          rel='noopener noreferrer'
          title='RSS feed'
          href='/feed'
          className='md:max-w-max motion-safe:transition hover:text-primary-500'
        >
          RSS
        </CustomLink>
      </div>
      <FooterCopyRight />
    </footer>
  )
}
