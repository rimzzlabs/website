import { tw } from '@/utils/tw'

import type { UnstyledLinkProps } from './unstyled'

import Link from 'next/link'
import { forwardRef } from 'react'

export const ColorLink: UnstyledLinkProps = forwardRef(({ flex, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      {...props}
      className={tw(
        flex && 'flex items-center',
        'text-primary-600 dark:text-primary-500 font-medium no-underline',
        'hover:text-primary-700 dark:hover:text-primary-600',
        props.className,
      )}
    >
      {children}
    </Link>
  )
})

ColorLink.displayName = 'ColorLink'
