import { NAVBAR_ROUTES } from '@/data/routes'

import { NavbarItem } from './navbar-item'

export const Navbar = () => {
  return (
    <nav className='hidden md:flex items-center'>
      {NAVBAR_ROUTES.map((item) => {
        return <NavbarItem key={item.href} {...item} />
      })}
    </nav>
  )
}
