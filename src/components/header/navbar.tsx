import { NavbarItem } from './navbar-item'

export const NAVBAR_ROUTES = [
  { href: '/', name: 'Home' },
  { href: '/portfolio', name: 'Fun Stuff' },
  { href: '/blog', name: 'Blog' },
  { href: '/about', name: 'About Me' },
]

export const Navbar = () => {
  return (
    <nav>
      {NAVBAR_ROUTES.map((item) => {
        return <NavbarItem key={item.href} {...item} />
      })}
    </nav>
  )
}
