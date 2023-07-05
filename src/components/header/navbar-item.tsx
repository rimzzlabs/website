import { type ROUTE } from '@/domains/routes'

import { tw } from '@/utils/tw'

import { UnstyledLink } from '../link/unstyled'

export const NavbarItem = ({ name, ...props }: ROUTE) => {
  return (
    <UnstyledLink {...props} className={tw('mr-4 last-of-type:mr-unset')}>
      {name}
    </UnstyledLink>
  )
}
