import clsx from 'clsx'

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => (
  <button className={clsx('inline-flex items-center justify-center', className)} {...props}>
    {children}
  </button>
)

export default Button
