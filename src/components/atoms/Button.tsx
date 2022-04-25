import { twclsx } from '@/libs/twclsx'

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => (
  <button className={twclsx('inline-flex items-center justify-center', className)} {...props}>
    {children}
  </button>
)

export default Button
