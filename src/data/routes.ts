export type ROUTE = {
  name: string
  href: string
  title: string
}

export const ALL_ROUTE = [
  { href: '/', name: 'Home', title: 'Home Page' },
  { href: '/blog', name: 'Blog', title: 'Blog Page' },
  { href: '/portfolio', name: 'Portfolio', title: 'Portfolio Page' },
  { href: '/guestbook', name: 'Guestbook', title: 'Guestbook Page' },
  { href: '/snippet', name: 'Snippet', title: 'Snippet page' },
  { href: '/resume', name: 'Certificate', title: 'Resume' },
] as const

export const NAVBAR_ROUTES = ALL_ROUTE.slice(0, 4)
