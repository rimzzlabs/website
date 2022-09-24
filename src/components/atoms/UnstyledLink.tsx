import { twclsx } from '@/libs/twclsx'

import NextLink, { LinkProps } from 'next/link'
import { createElement } from 'react'

export interface UnstyledLinkProps extends LinkProps {
  href: string
  title?: string
  className?: string
  children?: React.ReactNode
}

const UnstyledLink: React.FunctionComponent<UnstyledLinkProps> = ({ href, children, onClick, ...props }) => {
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

export default UnstyledLink
