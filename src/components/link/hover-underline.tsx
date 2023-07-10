import { tw } from '@/utils/tw'

import type { UnstyledLinkProps } from './unstyled'

import Link from 'next/link'
import { forwardRef } from 'react'

export const HoverUnderlineLink: UnstyledLinkProps = forwardRef(
  ({ flex, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        className={tw(
          flex && 'flex items-center',
          'underline decoration-2',
          'decoration-transparent hover:decoration-primary-500',
          props.className,
        )}
      >
        {children}
      </Link>
    )
  },
)

HoverUnderlineLink.displayName = 'HoverUnderlineLink'
