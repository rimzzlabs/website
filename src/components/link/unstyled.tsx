import { tw } from '@/utils/tw'

import Link, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

type Props = {
  title: string
  flex?: boolean
} & NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export type UnstyledLinkProps = typeof UnstyledLink

export const UnstyledLink = forwardRef<HTMLAnchorElement, Props>(
  ({ flex, children, ...props }, ref) => {
    return (
      <Link ref={ref} {...props} className={tw(flex && 'flex items-center', props.className)}>
        {children}
      </Link>
    )
  },
)

UnstyledLink.displayName = 'UnstyledLink'
