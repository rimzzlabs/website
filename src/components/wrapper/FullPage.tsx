import type { RegularComponent } from '@/types/customType'

import clsx from 'clsx'

/**
 * @description this compnenet is used to wrap the content of the page in a full page of the website by using tailwind utiliy min height of the viewport and has padding top and bottom of 5rem
 */
const FullPage = ({ children, className = '' }: RegularComponent) => {
  return <div className={clsx('min-h-screen py-20 w-full', className)}>{children}</div>
}

export default FullPage
