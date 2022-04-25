import UnstyledLink from '@/components/atoms/UnstyledLink'

import APP_ROUTE from '@/libs/constants/route'
import SOCIAL from '@/libs/constants/social'

import clsx from 'clsx'

const Footer: React.FC = () => {
  const className = clsx(
    'text-sm md:text-base md:max-w-max',
    'text-theme-500 hover:text-primary-500',
    'dark:text-theme-400 dark:hover:text-primary-400'
  )
  const YEAR_NOW = new Date().getFullYear()

  return (
    <footer
      className={clsx('border-t pb-4 md:pb-8 pt-6 md:pt-10 mt-10 md:mt-20', 'border-theme-300 dark:border-theme-700')}
    >
      <div className='flex mb-8 md:mb-12'>
        <div className={clsx('flex flex-col', 'w-full', 'space-y-4')}>
          {APP_ROUTE.map((route) => (
            <UnstyledLink title={route.name} className={className} href={route.path} key={route.path}>
              {route.name}
            </UnstyledLink>
          ))}
        </div>

        <div className={clsx('flex flex-col', 'w-full', 'space-y-4')}>
          {SOCIAL.map((route) => (
            <UnstyledLink title={route.title} className={className} href={route.href} key={route.href}>
              {route.title}
            </UnstyledLink>
          ))}
        </div>
      </div>

      <p className='text-sm font-medium mb-2 text-theme-500 dark:text-theme-400'>
        Made with &#128150; by{' '}
        <UnstyledLink
          title='Rizki Maulana Citras Github Profile'
          className={clsx(
            'text-primary-600 hover:text-primary-500',
            'dark:text-primary-400 dark:hover:text-primary-300'
          )}
          href='https://github.com/rizkimcitra'
        >
          Rizki M Citra
        </UnstyledLink>
      </p>

      <p className={clsx('text-sm font-medium text-theme-500', 'dark:text-theme-400')}>
        &copy; 2021 - {YEAR_NOW} Under MIT License
      </p>
    </footer>
  )
}

export default Footer
