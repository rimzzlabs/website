import clsx from 'clsx'
import Link from 'next/link'
import type { NextLinkProps } from '@/types/customType'

/**
 * @description this custom NextLink is used to have a nice custom and reusable Link, it has 3 diferrent type of anchor tag:
 * 1. if href string start with `/` it will return an anchor tag wrapped by nextjs `<Link />` component
 * 2. if href string start with `#` it will have a regular anchor tag
 * 3. if none above condition were met, this will return an anchor tag that contains property of `target="_blank"` and `rel="noopener noreferrer"`
 */
const NextLink = ({
  href,
  children,
  unstyled = false,
  ...props
}: NextLinkProps) => {
  const unstyledLink =
    (unstyled &&
      clsx(
        'relative max-w-max z-1',
        'after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:z-[-1]',
        'after:transition-all after:duration-200',
        'after:bg-primary-400 dark:after:bg-rose-500',
        'hover:after:h-2.5'
      )) ||
    ''

  const receivedClassName = `${props.className || ''} ${unstyledLink || ''}`

  if (href.startsWith('/')) {
    return (
      <Link href={href} scroll={false}>
        <a {...props}>{children}</a>
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={receivedClassName} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      className={receivedClassName}
      target='_blank'
      rel='noopener noreferrer'
      {...props}>
      {children}
    </a>
  )
}

export default NextLink
