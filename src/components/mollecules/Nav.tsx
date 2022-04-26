import UnstyledLink from '@/components/atoms/UnstyledLink'

import APP_ROUTE from '@/libs/constants/route'
import { twclsx } from '@/libs/twclsx'

import { useRouter } from 'next/router'

/**
 * A Nav componet that renders a list of links to the routes defined in the `src/libs/constant.ts`
 */
const Nav: React.FunctionComponent = () => {
  const { pathname } = useRouter()

  return (
    <nav className={twclsx('flex items-center', '-ml-3 md:-ml-3.5')}>
      {APP_ROUTE.map((route) => (
        <UnstyledLink
          title={`route ${route.name}`}
          key={route.name}
          href={route.path}
          className={twclsx(
            'relative inline-flex text-sm md:text-base items-center justify-center',
            'py-1 md:py-1.5 px-3 md:px-3.5 rounded transition-all',
            'hover:bg-primary-100 dark:hover:bg-theme-800',
            route.path === pathname ? 'text-primary-700 dark:text-primary-400' : 'text-theme-900 dark:text-theme-300'
          )}
        >
          {route.name}
        </UnstyledLink>
      ))}
    </nav>
  )
}

export default Nav
