import clsx from 'clsx'
import Link from 'next/link'

type NextLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  passHref?: boolean
  prefetch?: boolean
  unstyled?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: 'noopener noreferrer'
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

//  NextLink component that accept some props, return a Link component with those props
// return conditionally new tab or not
const NextLink = ({
  href,
  children,
  unstyled = false,
  ...props
}: NextLinkProps) => {
  const unstyledLink =
    unstyled &&
    clsx(
      'relative max-w-max z-1',
      'after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:z-[-1]',
      'after:transition-all after:duration-200',
      'after:bg-primary-400 dark:after:bg-rose-500',
      'hover:after:h-2.5'
    )

  if (href.startsWith('/')) {
    return (
      <Link href={href} scroll={false}>
        <a {...props}>{children}</a>
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={`${props.className || ''} ${unstyledLink || ''}`}
      {...props}>
      {children}
    </a>
  )
}

export default NextLink
