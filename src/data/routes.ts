export type ROUTE = {
  name: string
  href: string
  title: string
}

export const ALL_ROUTE: ROUTE[] = [
  { href: '/', name: 'Home', title: 'Home Page' },
  { href: '/portfolio', name: 'Portfolio', title: 'Portfolio Page' },
  { href: '/blog', name: 'Blog', title: 'Blog Page' },
  { href: '/guestbook', name: 'Guestbook', title: 'Guestbook Page' },
  { href: '/snippet', name: 'Snippet', title: 'Snippet page' },
  { href: '/resume', name: 'Certificate', title: 'Resume' },
]

export const NAVBAR_ROUTES: ROUTE[] = ALL_ROUTE.slice(0, 4)
