import { UnstyledLink } from '@/UI/links'

import APP_ROUTE, { ADDT_ROUTE } from '@/libs/constants/route'
import { twclsx } from '@/libs/twclsx'

import { SocialHome } from './SocialHome'

import { useRouter } from 'next/router'

export const Footer: React.FunctionComponent = () => {
  const { pathname } = useRouter()
  const isError = pathname === '/_error' || pathname === '/_offline' || pathname === '/404'

  if (isError) {
    return null
  }

  return (
    <footer className={twclsx('layout', 'py-4 mt-5', 'border-t', 'border-theme-300 dark:border-theme-700')}>
      <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:justify-between'>
        <div className='flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0 w-full md:max-w-max'>
          {APP_ROUTE.map((route) => (
            <UnstyledLink
              href={route.path}
              key={`footer-${route.path}`}
              className='text-sm font-medium md:max-w-max border-b border-dashed border-transparent hover:border-b-theme-500 text-theme-500 dark:text-theme-400'
            >
              {route.name}
            </UnstyledLink>
          ))}
        </div>

        <div className='flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0 w-full md:max-w-max'>
          {ADDT_ROUTE.map((route) => (
            <UnstyledLink
              href={route.path}
              key={`footer-${route.path}`}
              className='text-sm font-medium md:max-w-max border-b border-dashed border-transparent hover:border-b-theme-500 text-theme-500 dark:text-theme-400'
            >
              {route.name}
            </UnstyledLink>
          ))}
        </div>
      </div>

      <div className='mt-4 max-w-max'>
        <SocialHome />
      </div>
    </footer>
  )
}
