import clsx from 'clsx'

type TogglerProps = {
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Toggler = ({ children, onClick, className = '' }: TogglerProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center',
        'p-2 md:p-3 border rounded transition-all duration-200',
        'border-dark-300 dark:border-dark-700 bg-white dark:bg-dark-900',
        'hover:bg-dark-100 dark:hover:bg-dark-700',
        className
      )}>
      {children}
    </button>
  )
}

export default Toggler
