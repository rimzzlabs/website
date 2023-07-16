'use client'

import { ALL_ROUTES } from '@/domains/routes'

import { UnstyledLink } from '../link'

import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const FooterLinks = () => {
  const pathname = usePathname()

  const routes = ALL_ROUTES.filter((route) => {
    return match(route.href)
      .with(P.not(P.shape(pathname)), () => true)
      .otherwise(() => false)
  })

  return (
    <div className='flex items-center space-x-3'>
      {routes.map(({ name, ...item }) => {
        return (
          <UnstyledLink
            {...item}
            className='md:max-w-max motion-safe:transition hover:text-primary-500'
            key={item.href}
          >
            {name}
          </UnstyledLink>
        )
      })}
    </div>
  )
}
