import { twclsx } from '@/libs/twclsx'

import { createElement } from 'react'

export type UnstyledButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const UnstyledButton: React.FunctionComponent<UnstyledButtonProps> = ({ children, className, ...props }) => {
  return createElement(
    'button',
    { ...props, className: twclsx('inline-flex items-center justify-center', className) },
    children
  )
}
