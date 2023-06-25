import { tw } from '@/utils/tw'

import { UnstyledLinkProps } from './unstyled'

import Link from 'next/link'
import { forwardRef } from 'react'

export const ColorLink: UnstyledLinkProps = forwardRef(({ flex, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      {...props}
      className={tw(
        flex && 'flex items-center',
        'text-primary-600 dark:text-primary-500 font-medium',
        props.className,
      )}
    >
      {children}
    </Link>
  )
})

ColorLink.displayName = 'ColorLink'
