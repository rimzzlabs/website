import APP_ROUTE from '@/libs/constants/route'
import SOCIAL from '@/libs/constants/social'

import { Link } from '../atoms/Link'
import DarkMode from '../mollecules/DarkMode'

import clsx from 'clsx'

const Footer: React.FC = () => {
  const className = clsx(
    'text-sm md:text-base',
    'text-theme-600 hover:text-theme-900',
    'dark:text-theme-400 dark:hover:text-primary-100'
  )

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
      <p className={clsx('text-center text-sm text-theme-700 dark:text-theme-400')}>
        &copy; Rizki M Citra Under MIT License
      </p>
    </footer>
  )
}

export default Footer
