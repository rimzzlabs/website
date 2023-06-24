import { type ROUTE } from './type'

export const ALL_ROUTES: ROUTE[] = [
  { href: '/', name: 'Home', title: 'Home Page' },
  { href: '/blog', name: 'Blog', title: 'Blog Page' },
  { href: '/portfolio', name: 'Portfolio', title: 'Portfolio Page' },
  { href: '/guestbook', name: 'Guestbook', title: 'Guestbook Page' },
  { href: '/snippet', name: 'Snippet', title: 'Snippet page' },
  { href: '/resume', name: 'Certificate', title: 'Resume' },
]

export const NAVBAR_ROUTES = ALL_ROUTES.slice(0, 4)
