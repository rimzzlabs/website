import APP_ROUTE from '@/libs/constants/route'
import SOCIAL from '@/libs/constants/social'

import Link from '../atoms/Link'
import DarkMode from '../mollecules/DarkMode'

import clsx from 'clsx'

const Footer: React.FC = () => {
  const className = clsx(
    'text-sm md:text-base md:max-w-max',
    'text-theme-500 hover:text-primary-500',
    'dark:text-theme-400 dark:hover:text-primary-400'
  )
  const date = new Date().getFullYear()

  return (
    <footer className={clsx('border-t py-4 md:py-12 mt-10 md:mt-20', 'border-theme-300 dark:border-theme-700')}>
      <div className='flex justify-end pb-4 md:pb-8'>
        <DarkMode />
      </div>
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 mb-8 md:mb-12'>
        <div className={clsx('flex flex-col', 'w-full', 'space-y-4')}>
          {APP_ROUTE.map((route) => (
            <Link className={className} href={route.path} key={route.path}>
              {route.name}
            </Link>
          ))}
        </div>
        <div className={clsx('flex flex-col', 'w-full', 'space-y-4')}>
          {SOCIAL.map((route) => (
            <Link className={className} href={route.href} key={route.href} newTab>
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <p className={clsx('text-sm mb-2 md:mb-4 text-theme-500 dark:text-theme-400')}>
        &copy; 2021 - {date} Under{' '}
        <Link
          className='hover:underline decoration-2 decoration-primary-500 dark:decoration-primary-400'
          href='https://github.com/rizkimcitra/rizkicitra/blob/main/LICENSE'
          newTab
        >
          MIT License
        </Link>{' '}
      </p>
      <p className='text-sm text-theme-500 dark:text-theme-400'>
        Made with &#128153; by{' '}
        <Link
          className='hover:underline decoration-2 decoration-primary-500 dark:decoration-primary-400'
          href='https://github.com/rizkimcitra'
          newTab
        >
          Rizki M Citra
        </Link>
      </p>
    </footer>
  )
}

export default Footer
