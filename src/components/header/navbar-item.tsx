'use client'

import { CustomLink } from '@/components/custom-link'

import { tw } from '@/utils/common'

import type { ROUTE } from '@/constants/route'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

export const NavbarItem = (props: ROUTE) => {
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
        'relative pb-px text-sm mr-2.5 last-of-type:mr-unset',
        isActive ? 'text-base-700 dark:text-base-300' : 'text-base-500',
      )}
    >
      {props.name}

      {isActive && (
        <motion.div
          className={tw(
            'absolute inset-x-0 h-px bottom-0 bg-base-400',
            'dark:bg-gradient-to-r dark:from-base-300 dark:bg-unset',
          )}
          layoutId='navbar-desktop'
          transition={{
            type: 'tween',
            duration: 0.25,
          }}
        />
      )}
    </CustomLink>
  )
}
