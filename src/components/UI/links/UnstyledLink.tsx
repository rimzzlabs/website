import NextLink from 'next/link'
import type { LinkProps } from 'next/link'
import { createElement } from 'react'

export type UnstyledLinkProps = {
  href: string
  title?: string
  className?: string
  children?: React.ReactNode
} & LinkProps

export const UnstyledLink: React.FunctionComponent<UnstyledLinkProps> = ({ href, ...props }) => {
  if (href.startsWith('http')) {
    return createElement('a', { href, rel: 'noopener noreferrer', target: '_blank', ...props }, props.children)
  }

  return (
    <NextLink href={href} scroll={false} {...props}>
      {props.children}
    </NextLink>
  )
}
