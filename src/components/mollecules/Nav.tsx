import { routes } from '@/libs/constant'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * A Nav componet that renders a list of links to the routes defined in the `src/libs/constant.ts`
 */
const Nav: React.FC = () => {
  const { pathname } = useRouter()
  return (
    <nav className={clsx('flex items-center space-x-1 md:space-x-1.5')}>
      {routes.map((route) => (
        <Link key={route.name} href={route.path}>
          <a
            className={clsx(
              'inline-flex items-center justify-center',
              'py-1 md:py-1.5 px-3 md:px-3.5 rounded',
              'hover:bg-theme-300 dark:hover:bg-theme-800 text-theme-600 dark:text-theme-700',
              route.path === pathname && 'text-theme-800 dark:text-theme-100'
            )}
          >
            {route.name}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default Nav
