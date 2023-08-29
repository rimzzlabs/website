'use client'

import { ALL_ROUTES } from '@/constants/route'

import { CustomLink } from '../custom-link'

import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const FooterLinks = () => {
  const pathname = usePathname()
  const links: typeof ALL_ROUTES = [
    ...ALL_ROUTES,
    { href: '/feed', name: 'RSS', title: 'RSS Feed' },
  ]

  const routes = links.filter((route) => {
    return match(route.href)
      .with(P.not(P.shape(pathname)), () => true)
      .otherwise(() => false)
  })

  return (
    <div className='flex items-center space-x-3'>
      {routes.map(({ name, ...item }) => {
        return (
          <CustomLink
            {...item}
            key={item.href}
            variant='unstyled'
            className='text-base-700 dark:text-base-300 md:max-w-max motion-safe:transition hover:text-primary-500 dark:hover:text-primary-500'
          >
            {name}
          </CustomLink>
        )
      })}
    </div>
  )
}
