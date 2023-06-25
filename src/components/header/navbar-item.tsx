import { type ROUTE } from '@/domains/routes'

import { tw } from '@/utils/tw'

import { UnstyledLink } from '../link/unstyled'

export const NavbarItem = (props: ROUTE) => {
  return (
    <UnstyledLink
      href={props.href}
      title={props.title}
      className={tw('mr-4 last-of-type:mr-unset')}
    >
      {props.name}
    </UnstyledLink>
  )
}
