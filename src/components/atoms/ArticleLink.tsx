import Link, { LinkProps } from '@/components/atoms/Link'

import clsx from 'clsx'

const ArticleLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        'relative inline-flex items-center',
        'border-b border-dashed no-underline',
        'border-theme-900 dark:border-theme-200',
        'text-theme-700 dark:text-theme-400 hover:text-primary-500 dark:hover:text-primary-400',
        'after:absolute after:left-0 after:-bottom-0.5',
        'after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full',
        'after:bg-gradient-to-r after:from-primary-500 after:to-ternary-500'
      )}
    >
      {children}
    </Link>
  )
}

export default ArticleLink
