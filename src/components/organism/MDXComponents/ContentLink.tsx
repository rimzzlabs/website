import Link, { LinkProps } from '@/components/atoms/Link'

import clsx from 'clsx'

const ContentLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  const className = clsx(
    'relative inline-flex items-center',
    'border-b border-dashed no-underline',
    'border-theme-900 dark:border-theme-200',
    'text-primary-700 dark:text-primary-300 font-semibold',
    'after:absolute after:left-0 after:-bottom-0.5',
    'after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full',
    'after:bg-gradient-to-r after:from-primary-500 after:to-ternary-500'
  )

  if (href.toString().startsWith('http')) {
    return (
      <Link {...props} href={href} className={className} newTab>
        {children}
      </Link>
    )
  }

  return (
    <Link {...props} href={href} className={className}>
      {children}
    </Link>
  )
}

export default ContentLink
