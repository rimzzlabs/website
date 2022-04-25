import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'

export interface UnstyledLinkProps extends LinkProps {
  href: string
  onClick?: () => void
  title?: string
  className?: string
  children?: React.ReactNode
}

const UnstyledLink: React.FunctionComponent<UnstyledLinkProps> = ({ href, children, ...props }) => {
  if (href.startsWith('http')) {
    return (
      <a className={clsx(props.className)} href={href} rel='noopener noreferrer' target='_blank' title={props.title}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} scroll={false} {...props}>
      <a title={props.title ?? ''} onClick={props.onClick} className={clsx(props.className)}>
        {children}
      </a>
    </NextLink>
  )
}

export default UnstyledLink
