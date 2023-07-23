import { CustomLink } from '../custom-link'

export const FooterCopyRight = () => (
  <p className='mt-4 text-sm font-medium'>
    &copy; 2022 - {new Date().getFullYear()}{' '}
    <CustomLink variant='base' href='https://rizkicitra.dev' title="Rizki's Copyright">
      Rizki M Citra
    </CustomLink>
    . All rights reserved.
  </p>
)
