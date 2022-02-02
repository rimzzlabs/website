import { routes } from '@/utils/constant'

import clsx from 'clsx'
import Link from 'next/link'

/**
 * A Nav componet that renders a list of links to the routes defined in the `src/libs/constant.ts`
 */
const Nav: React.FC = () => {
  return (
    <nav className={clsx('flex items-center space-x-2 md:space-x-3')}>
      {routes.map((route) => (
        <Link key={route.name} href={route.path}>
          {route.name}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
