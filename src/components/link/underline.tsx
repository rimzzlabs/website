import { tw } from '@/utils/tw'

import type { UnstyledLinkProps } from './unstyled'

import Link from 'next/link'
import { forwardRef } from 'react'

export const UnderlineLink: UnstyledLinkProps = forwardRef((props, ref) => {
  return (
    <Link {...props} className={tw('underline', props.className)} ref={ref}>
      {props.children}
    </Link>
  )
})

UnderlineLink.displayName = 'UnderlineLink'
