import { ALL_ROUTES } from '@/domains/routes'

import { UnstyledLink } from '../link'

export const FooterLinks = () => (
  <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3'>
    {ALL_ROUTES.map(({ name, ...item }) => {
      return (
        <UnstyledLink
          {...item}
          className='md:max-w-max motion-safe:transition hover:text-primary-500'
          key={item.href}
        >
          {name}
        </UnstyledLink>
      )
    })}
  </div>
)
