import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = {
  className?: string
  mergeClass?: boolean
  newTab?: boolean
} & NextLinkProps

const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  const className = 'text-theme-500 hover:text-theme-900 dark:text-theme-400 dark:hover:text-primary-100'

  if (rest.newTab) {
    return (
      <a rel='noopener noreferrer' target='_blank' href={href as string} className={clsx(rest?.className ?? className)}>
        {children}
      </a>
    )
  }
  return (
    <NextLink scroll={false} href={href} {...rest}>
      <a className={clsx(rest?.className ?? className)}>{children}</a>
    </NextLink>
  )
}

export default Link
