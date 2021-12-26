import type { NextLinkProps } from '@/types/customType'

import clsx from 'clsx'
import Link from 'next/link'

/**
 * @description this custom NextLink is used to have a nice custom and reusable Link, it has 3 diferrent type of anchor tag:
 * 1. if href string start with `/` it will return an anchor tag wrapped by nextjs `<Link />` component
 * 2. if href string start with `#` it will have a regular anchor tag
 * 3. if none above condition were met, this will return an anchor tag that contains property of `target="_blank"` and `rel="noopener noreferrer"`
 */
const NextLink = ({ href, children, className = '', unstyled = false, ...props }: NextLinkProps) => {
  const unstyledClass = unstyled ? 'underline decoration-primary-500 dark:decoration-rose-500 underline-offset-1' : ''

  if (props.passHref) {
    return (
      <Link href={href} scroll={false} passHref {...props}>
        {children}
      </Link>
    )
  }

  if (props.smooth) {
    return (
      <button onClick={props.onClick} className={clsx(className, unstyledClass)}>
        {children}
      </button>
    )
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} scroll={false}>
        <a className={clsx(className, unstyledClass)} {...props}>
          {children}
        </a>
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={clsx(className, unstyledClass)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} className={clsx(className, unstyledClass)} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  )
}

export default NextLink
