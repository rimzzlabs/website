import Link, { LinkProps } from '@/components/atoms/Link'

import clsx from 'clsx'

const ArticleLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        'relative inline-flex items-center',
        'border-b border-dotted no-underline',
        'border-theme-500 dark:border-theme-600',
        'text-theme-600 dark:text-theme-400 hover:text-primary-500 dark:hover:text-primary-400',
        'after:absolute after:left-0 after:bottom-0',
        'after:w-0 after:h-0.5 after:transition-all hover:after:w-full',
        'after:bg-primary-500 dark:after:bg-primary-400'
      )}
    >
      {children}
    </Link>
  )
}

export default ArticleLink
