'use client'

import { CustomLink } from '@/components/custom-link'

import { type ROUTE } from '@/domains/routes'

import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const NavbarItem = ({ name, ...props }: ROUTE) => {
  const pathname = usePathname()

  const variant = match(pathname)
    .with(
      P.when((path) => props.href === '/' && path === props.href),
      () => 'color' as const,
    )
    .with(
      P.when((path) => props.href !== '/' && path.includes(props.href)),
      () => 'color' as const,
    )
    .otherwise(() => null)

  const base = 'text-sm mr-2.5 last-of-type:mr-unset decoration-2 underline-offset-4'

  const className = match([variant, base])
    .with([P.not(P.nullish), P.select()], (base) => `${base} !underline`)
    .otherwise(([, base]) => {
      return `${base} hover:text-primary-600 dark:hover:text-primary-500 hover:underline`
    })

  return (
    <CustomLink {...props} variant={variant} className={className}>
      {name}
    </CustomLink>
  )
}
