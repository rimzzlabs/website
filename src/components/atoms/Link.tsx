import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = {
  className?: string
  newTab?: boolean
} & NextLinkProps

const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  if (rest.newTab) {
    return (
      <a rel='noopener noreferrer' target='_blank' href={href as string} className={clsx(rest.className)}>
        {children}
      </a>
    )
  }
  return (
    <NextLink scroll={false} href={href} {...rest}>
      <a className={clsx(rest.className)}>{children}</a>
    </NextLink>
  )
}

export default Link
