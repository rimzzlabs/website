import type { TogglerProps } from '@/types/customType'

import clsx from 'clsx'

/**
 * @description this component is used to toggle something, the children are up to you, the className is optional
 * this comopnent is just a button
 * @param {TogglerProps} children React Node
 * @param {TogglerProps} onClick a function that will be called when the button is clicked, or an event handler if you prefer
 * @param {TogglerProps} className a className that will be added to the button
 * @returns
 */
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
      )}
    >
      {children}
    </button>
  )
}

export default Toggler
