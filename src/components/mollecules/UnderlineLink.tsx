import UnstyledLink, { UnstyledLinkProps } from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs/twclsx'

const UnderlineLink: React.FunctionComponent<UnstyledLinkProps> = ({ href, children, className, ...props }) => {
  return (
    <UnstyledLink
      className={twclsx(
        'relative inline-flex items-center',
        'border-b border-dashed no-underline',
        'border-theme-900 dark:border-theme-200',
        'text-primary-700 dark:text-primary-400 font-semibold',
        'after:absolute after:left-0 after:-bottom-0.5',
        'after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full',
        'after:bg-gradient-to-r after:from-primary-500 after:to-ternary-500',
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </UnstyledLink>
  )
}

export default UnderlineLink
