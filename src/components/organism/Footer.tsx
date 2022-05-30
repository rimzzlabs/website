import UnstyledLink from '@/components/atoms/UnstyledLink'

import APP_ROUTE, { ADDT_ROUTE } from '@/libs/constants/route'
import SOCIAL from '@/libs/constants/social'
import { twclsx } from '@/libs/twclsx'

import { useRouter } from 'next/router'

const Footer: React.FunctionComponent = () => {
  const { pathname } = useRouter()
  const isError = pathname === '/_error' || pathname === '/_offline' || pathname === '/404'
  const className = twclsx(
    'text-sm md:text-base md:max-w-max',
    'text-theme-500 hover:text-primary-500',
    'dark:text-theme-400 dark:hover:text-primary-400'
  )
  const YEAR_NOW = new Date().getFullYear()

  if (isError) {
    return null
  }

  return (
    <footer
      className={twclsx(
        'pb-4 md:pb-8 pt-6 md:pt-10',
        'mt-10 md:mt-20',
        'border-t',
        'border-theme-300 dark:border-theme-700'
      )}
    >
      <div className={twclsx('flex', 'mb-8 md:mb-12')}>
        <div className={twclsx('flex flex-col', 'w-full', 'space-y-4')}>
          {APP_ROUTE.map((route) => (
            <UnstyledLink title={route.name} className={twclsx(className)} href={route.path} key={route.path}>
              {route.name}
            </UnstyledLink>
          ))}
        </div>

        <div className={twclsx('flex flex-col', 'w-full', 'space-y-4')}>
          {SOCIAL.map((route) => (
            <UnstyledLink
              title={route.title}
              className={twclsx(className, `umami--click--${route.title.toLowerCase()}-button`)}
              href={route.href}
              key={route.href}
            >
              {route.title}
            </UnstyledLink>
          ))}
        </div>

        <div className={twclsx('flex flex-col', 'w-full', 'space-y-4')}>
          {ADDT_ROUTE.map((route) => (
            <UnstyledLink title={route.name} className={twclsx(className)} href={route.path} key={route.path}>
              {route.name}
            </UnstyledLink>
          ))}
        </div>
      </div>

      <p className={twclsx('mb-2', 'text-sm font-medium', 'text-theme-500 dark:text-theme-400')}>
        Made with &#128150; by{' '}
        <UnstyledLink
          title='Rizki Maulana Citras Github Profile'
          className={twclsx(
            'text-primary-600 hover:text-primary-500',
            'dark:text-primary-400 dark:hover:text-primary-300',
            'umami--click--github-profile-button'
          )}
          href='https://github.com/rizkimcitra'
        >
          Rizki M Citra
        </UnstyledLink>
      </p>

      <p className={twclsx('text-sm font-medium text-theme-500', 'dark:text-theme-400')}>
        &copy; 2021 - {YEAR_NOW} Under MIT License
      </p>
    </footer>
  )
}

export default Footer
