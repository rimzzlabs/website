import Nav from '../mollecules/Nav'

import clsx from 'clsx'

const Header = () => (
  <div className={clsx('fixed inset-0', 'h-16 md:h-24', 'backdrop-blur z-50', 'bg-theme-50/50 dark:bg-theme-900/50')}>
    <div className={clsx('h-2 w-full', 'bg-gradient-to-r', 'from-primary-500 to-ternary-500')} />
    <header className={clsx('layout h-full', 'flex items-center justify-between')}>
      <Nav />
    </header>
  </div>
)

export default Header
