import { HoverUnderlineLink } from '@/components/link'

export const FooterCopyRight = () => (
  <p className='mt-4'>
    &copy; 2022 - {new Date().getFullYear()}{' '}
    <HoverUnderlineLink href='https://rizkicitra.dev' title="Rizki's Copyright">
      Rizki M Citra
    </HoverUnderlineLink>
    . All rights reserved.
  </p>
)
