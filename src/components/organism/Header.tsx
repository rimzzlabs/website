import DrawerToggler from '@/components/atoms/DrawerToggler'
import DarkMode from '@/components/mollecules/DarkMode'
import Nav from '@/components/mollecules/Nav'

import useMediaQuery from '@/hooks/useMediaQuery'
import useWindowScroll from '@/hooks/useWindowScroll'
import { twclsx } from '@/libs/twclsx'

import { useRouter } from 'next/router'

const Header = () => {
  const { pathname } = useRouter()
  const scrollPos = useWindowScroll()
  const mdscreen = useMediaQuery('(min-width: 768px)')

  const isError = pathname === '/_error' || pathname === '/404'

  if (isError) return null

  return (
    <header
      className={twclsx(
        'fixed inset-0',
        'h-20 border-b transition z-10',
        'bg-theme-50 dark:bg-theme-900',
        scrollPos > 68 ? 'border-theme-300 dark:border-theme-700' : 'border-transparent'
      )}
    >
      <div
        className={twclsx(
          'relative',
          'h-2 w-full',
          'bg-gradient-to-r',
          'from-primary-500 to-ternary-500',
          'before:absolute before:inset-0 before:bg-gradient-to-r',
          'before:from-primary-500 before:to-violet-500',
          'before:animate-pulse'
        )}
      />

      <div className={twclsx('layout h-full pb-2', 'flex items-center justify-between')}>
        {mdscreen && <Nav />}

        <DrawerToggler />

        <DarkMode />
      </div>
    </header>
  )
}

export default Header
