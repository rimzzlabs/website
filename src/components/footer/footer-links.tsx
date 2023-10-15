'use client'

import { ALL_ROUTES } from '@/constants/route'

import { CustomLink } from '../custom-link'
import { FooterSignoutButton } from './footer-signout-button'

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

      <FooterSignoutButton />
    </div>
  )
}
