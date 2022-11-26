// import { useWindowScrollPos } from '@/hook/useWindowScrollPos'
import { twclsx } from '@/libs'
import APP_ROUTE from '@/libs/constants/route'

import { useWindowScrollY } from '@/hooks'

import { MobileNav } from './MobileNav'
import { ThemeMenu } from './ThemeMenu'

import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header: React.FunctionComponent = () => {
  const y = useWindowScrollY()
  const router = useRouter()

  return (
    <header
      className={twclsx(
        'sticky top-0 inset-x-0 z-50',
        'border-b border-b-transparent',
        'bg-theme-50 dark:bg-theme-900',
        'supports-[backdrop-filter:blur(0px)]:bg-theme-50/50 dark:supports-[backdrop-filter:blur(0px)]:bg-theme-900/50',
        'supports-[backdrop-filter:blur(0px)]:backdrop-blur-md',
        y > 40 && 'border-b-theme-300 dark:border-b-theme-600'
      )}
    >
      <nav className='layout flex items-center justify-end md:justify-between h-16 md:h-20'>
        <div className='md:flex md:items-center hidden space-x-3'>
          {APP_ROUTE.map((route) => {
            return (
              <Link
                className={twclsx(
                  'font-semibold border-b border-dashed',
                  router.pathname === route.path ? 'border-theme-800 dark:border-theme-200' : 'border-transparent'
                )}
                href={route.path}
                key={route.path}
              >
                {route.name}
              </Link>
            )
          })}
        </div>

        <div className='inline-flex items-center justify-end space-x-2.5 md:space-x-0'>
          <ThemeMenu />
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
