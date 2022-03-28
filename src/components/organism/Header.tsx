import Nav from '@/components/mollecules/Nav'

import useWindowScroll from '@/hooks/useWindowScroll'

import clsx from 'clsx'
import { useRouter } from 'next/router'

const Header = () => {
  const { pathname } = useRouter()
  const scrollPos = useWindowScroll()

  const isError = pathname === '/_error' || pathname === '/404'

  if (isError) return null

  return (
    <div
      className={clsx(
        'fixed inset-0',
        'h-16 md:h-20',
        'backdrop-blur border-b transition z-10',
        'bg-theme-50/90 dark:bg-theme-900/90',
        scrollPos > 68 ? 'border-theme-300 dark:border-theme-700' : 'border-transparent'
      )}
    >
      <div className={clsx('h-2 w-full', 'bg-gradient-to-r', 'from-primary-500 to-ternary-500')} />
      <header className={clsx('layout h-full pb-2', 'flex items-center justify-between')}>
        <Nav />
      </header>
    </div>
  )
}

export default Header
