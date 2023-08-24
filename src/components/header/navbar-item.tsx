'use client'

import { CustomLink } from '@/components/custom-link'

import { tw } from '@/utils/tw'

import type { ROUTE } from '@/constants/route'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const NavbarItem = ({ name, ...props }: ROUTE) => {
  const pathname = usePathname()

  const isActive = match(pathname)
    .with(
      P.when((path) => props.href === '/' && path === props.href),
      () => true,
    )
    .with(
      P.when((path) => props.href !== '/' && path.includes(props.href)),
      () => true,
    )
    .otherwise(() => false)

  return (
    <CustomLink
      {...props}
      variant='base'
      className={tw(
        'relative pb-0.5 text-sm mr-2.5 last-of-type:mr-unset',
        isActive ? 'text-base-700 dark:text-base-300' : 'text-base-600 dark:text-base-400',
      )}
    >
      {name}

      {isActive && (
        <motion.div
          className='absolute inset-x-0 h-0.5 bottom-0 bg-base-700 dark:bg-base-300'
          layoutId='navbar-desktop'
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />
      )}
    </CustomLink>
  )
}
