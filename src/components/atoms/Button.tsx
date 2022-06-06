import { twclsx } from '@/libs/twclsx'

import { createElement } from 'react'

const Button: React.FunctionComponent<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => {
  return createElement(
    'button',
    { ...props, className: twclsx('inline-flex items-center justify-center', className) },
    children
  )
}

export default Button
