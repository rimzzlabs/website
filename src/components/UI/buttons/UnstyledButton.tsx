import { twclsx } from '@/libs/twclsx'

import { createElement } from 'react'

export const UnstyledButton: React.FunctionComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return createElement(
    'button',
    { ...props, className: twclsx('inline-flex items-center justify-center', className) },
    children
  )
}
