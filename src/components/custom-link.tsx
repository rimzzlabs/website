import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Link, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const customLink = cva('font-medium', {
  variants: {
    variant: {
      unstyled: '',
      base: [
        'transition no-underline',
        'text-base-700 dark:text-base-300',
        'hover:text-base-600 dark:hover:text-base-400',
      ],
      color: [
        'transition no-underline',
        'text-primary-600 dark:text-primary-500',
        'hover:text-primary-400 dark:hover:text-primary-600',
      ],
      colorUnderline: [
        'transition',
        'text-primary-600 dark:text-primary-500',
        'hover:text-primary-400 dark:hover:text-primary-600',
        'underline decoration-dotted underline-offset-4',
        'decoration-primary-600 dark:decoration-primary-400',
        'hover:decoration-primary-400 dark:hover:decoration-primary-600',
      ],
      underline: ['underline decoration-dotted underline-offset-4'],
    },
  },
  defaultVariants: {
    variant: 'color',
  },
})

type HTMLLinkWithoutHref = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

type CustomLinkProps = {
  title: string
  flex?: boolean
} & LinkProps &
  HTMLLinkWithoutHref &
  VariantProps<typeof customLink>

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ variant, flex, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        className={twMerge(
          customLink({
            variant,
            className: twMerge(flex && 'flex items-center', props.className),
          }),
        )}
      >
        {props.children}
      </Link>
    )
  },
)

CustomLink.displayName = 'CustomLink'
