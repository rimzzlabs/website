import Nav from '../mollecules/Nav'

import clsx from 'clsx'
import { useRouter } from 'next/router'

const Header = () => {
  const { pathname } = useRouter()

  const isError = pathname === '/_error' || pathname === '/404'

  if (isError) return null

  return (
    <div className={clsx('fixed inset-0', 'h-16 md:h-20', 'backdrop-blur z-50', 'bg-theme-50/50 dark:bg-theme-900/50')}>
      <div className={clsx('h-2 w-full', 'bg-gradient-to-r', 'from-primary-500 to-ternary-500')} />
      <header className={clsx('layout h-full pb-2', 'flex items-center justify-between')}>
        <Nav />
      </header>
    </div>
  )
}

export default Header
