import { slugify } from '@/utils/slugify'
import { tw } from '@/utils/tw'

import { createElement, forwardRef } from 'react'
import { TbLink } from 'react-icons/tb'

type HeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type P = React.HTMLAttributes<HTMLHeadingElement>

export const mdxHeading = (type: HeadingVariants) => {
  const element = forwardRef<HTMLHeadElement, P>(({ children, ...props }, ref) => {
    return createElement<P, HTMLHeadElement>(
      type,
      {
        ...props,
        id: slugify(children as string),
        className: tw('heading-post', 'not-prose', props.className),
        ref,
      },
      <a className={tw('group')} href={`#${slugify(children as string)}`}>
        {children}
        <TbLink
          size={22}
          className='align-baseline inline-flex group-hover:visible group-hover:opacity-100 invisible opacity-0 transition ml-1.5'
        />
      </a>,
    )
  })

  element.displayName = 'MDXHeadingElement'

  return element
}
