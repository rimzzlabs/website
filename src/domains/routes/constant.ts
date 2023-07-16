import { type ROUTE } from './type'

import { P, match } from 'ts-pattern'

export const ALL_ROUTES: ROUTE[] = [
  { href: '/', name: 'Home', title: 'Home Page' },
  { href: '/blog', name: 'Blog', title: 'Blog Page' },
  { href: '/tag', name: 'Tag', title: 'Tag Page' },
]

export const NAVBAR_ROUTES = ALL_ROUTES.filter((route) => {
  return match(route.href)
    .with(P.shape('/').or('/blog').or('/project').or('/guestbook'), () => true)
    .otherwise(() => false)
})
