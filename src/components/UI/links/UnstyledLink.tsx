import { twclsx } from '@/libs/twclsx'

import NextLink from 'next/link'
import type { LinkProps } from 'next/link'
import { createElement } from 'react'

export type UnstyledLinkProps = {
  href: string
  title?: string
  className?: string
  children?: React.ReactNode
} & LinkProps

export const UnstyledLink: React.FunctionComponent<UnstyledLinkProps> = ({ href, children, onClick, ...props }) => {
  if (href.startsWith('http')) {
    return createElement('a', { href, rel: 'noopener noreferrer', target: '_blank', ...props }, children)
  }

  return (
    <NextLink href={href} scroll={false} {...props}>
      <a title={props.title ?? ''} onClick={onClick} className={twclsx(props.className)}>
        {children}
      </a>
    </NextLink>
  )
}
