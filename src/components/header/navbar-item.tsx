'use client'

import { type ROUTE } from '@/domains/routes'

import { tw } from '@/utils/tw'

import { CustomLink } from '../custom-link'

import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const NavbarItem = ({ name, ...props }: ROUTE) => {
  const pathname = usePathname()

  const activeClassName = match(pathname)
    .with(
      P.when((path) => props.href === '/' && path === props.href),
      () => 'text-primary-700 dark:text-primary-500',
    )
    .with(
      P.when((path) => props.href !== '/' && path.includes(props.href)),
      () => 'text-primary-700 dark:text-primary-500',
    )
    .otherwise(() => null)

  return (
    <CustomLink
      {...props}
      variant='unstyled'
      className={tw('mr-4 last-of-type:mr-unset', activeClassName)}
    >
      {name}
    </CustomLink>
  )
}
