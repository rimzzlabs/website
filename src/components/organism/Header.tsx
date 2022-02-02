import Nav from '../mollecules/Nav'

import clsx from 'clsx'

const Header = () => (
  <div className={clsx('fixed inset-0', 'h-12 md:h-16', 'backdrop-blur', 'bg-theme-50/50 dark:bg-theme-900/50')}>
    <div className={clsx('h-1 md:h-2 w-full', 'bg-gradient-to-r', 'from-indigo-500 to-primary-500')} />
    <header className={clsx('layout h-full', 'flex items-center justify-between')}>
      <Nav />
    </header>
  </div>
)

export default Header
