import { tw } from '@/utils/tw'

import Link, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

type Props = {
  title: string
  flex?: boolean
} & NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export type LinkProps = typeof UnstyledLink

export const UnstyledLink = forwardRef<HTMLAnchorElement, Props>(({ flex, ...props }, ref) => {
  return (
    <Link {...props} ref={ref} className={tw(flex && 'flex items-center', props.className)}>
      {props.children}
    </Link>
  )
})

UnstyledLink.displayName = 'UnstyledLink'
