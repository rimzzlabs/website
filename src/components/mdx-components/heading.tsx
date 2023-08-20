import { slugify } from '@/utils/slugify'
import { tw } from '@/utils/tw'

import { HashIcon } from 'lucide-react'
import { createElement } from 'react'

type HeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type P = React.HTMLAttributes<HTMLHeadingElement>

export const mdxHeading = (type: HeadingVariants) => {
  // eslint-disable-next-line react/display-name
  return (
    props: React.PropsWithChildren<React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>>,
  ) =>
    createElement<P, HTMLHeadElement>(
      type,
      {
        ...props,
        id: slugify(props.children as string),
        className: tw('heading-post', 'not-prose', props.className),
      },
      <a className={tw('group')} href={`#${slugify(props.children as string)}`}>
        {props.children}
        <HashIcon
          size={22}
          className='align-baseline inline-flex group-hover:visible group-hover:opacity-100 invisible opacity-0 transition ml-1.5'
        />
      </a>,
    )
}
