import DrawerToggler from '@/components/atoms/DrawerToggler'
import DarkMode from '@/components/mollecules/DarkMode'
import Nav from '@/components/mollecules/Nav'

import useMediaQuery from '@/hooks/useMediaQuery'
import useWindowScroll from '@/hooks/useWindowScroll'

import clsx from 'clsx'
import { useRouter } from 'next/router'

const Header = () => {
  const { pathname } = useRouter()
  const scrollPos = useWindowScroll()
  const mdscreen = useMediaQuery('(min-width: 768px)')

  const isError = pathname === '/_error' || pathname === '/404'

  if (isError) return null

  return (
    <header
      className={clsx(
        'fixed inset-0',
        'h-20 border-b transition z-10',
        'bg-theme-50 dark:bg-theme-900',
        scrollPos > 68 ? 'border-theme-300 dark:border-theme-700' : 'border-transparent'
      )}
    >
      <div className={clsx('h-2 w-full', 'bg-gradient-to-r', 'from-primary-500 to-ternary-500')} />
      <div className={clsx('layout h-full pb-2', 'flex items-center justify-between')}>
        {mdscreen && <Nav />}
        {!mdscreen && <DrawerToggler />}
        <DarkMode />
      </div>
    </header>
  )
}

export default Header
