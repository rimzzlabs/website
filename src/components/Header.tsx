import useTheme from '@/hooks/useTheme'
import { routes } from '@/utils/constant'

import clsx from 'clsx'
import Dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NextLink = Dynamic(() => import('./NextLink'))
const Toggler = Dynamic(() => import('./Toggler'))

/**
 * @description this Header element used to render the header of the website, the header is a navbar with a toggler button of dark mode
 * @returns JSX.Element
 */
const Header = () => {
  const { changeTheme, icon } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // grab html tag and assign to variable
      const html = document.querySelector('html')
      if (html?.className === 'dark light') {
        changeTheme()
        html.classList.remove('light')
        setTimeout(() => {
          html.style.colorScheme = 'dark'
        }, 500)
      }
    }
  }, [changeTheme])

  const { pathname } = useRouter()

  if (pathname === '/404') {
    return null
  }

  return (
    <div className={clsx('fixed top-0 left-0 w-full z-[99]', 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md')}>
      <NextLink
        href='#skip-nav'
        className={clsx(
          'flex items-center justify-center',
          ' py-2 px-4 rounded max-w-max fixed left-4 top-4 transition-all duration-200 z-[999]',
          '-translate-y-96 focus-visible:translate-y-0',
          'bg-primary-low text-primary-600'
        )}
      >
        Skip To Content
      </NextLink>
      <div className={clsx('w-full h-2 bg-gradient-to-r', 'from-indigo-500 to-sky-500')} />

      <header className={clsx('layout h-12 md:h-16', 'flex items-center md:space-x-0 justify-between')}>
        <nav className={clsx('flex items-center space-x-4 2xl:space-x-5')}>
          {routes.map((route, idx) => (
            <NextLink
              href={route.path}
              key={idx + route.path}
              className={clsx(
                'relative z-[1] after:absolute after:w-full',
                'after:left-0 after:bottom-0 after:z-[-1] after:transition-all duration-300',
                'after:bg-primary-500',
                pathname === route.path || pathname === route.path + '/[slug]' ? 'after:h-1' : 'after:h-0'
              )}
            >
              {route.name}
            </NextLink>
          ))}
        </nav>

        <div className='flex space-x-2 items-center'>
          <Toggler onClick={changeTheme}>
            <span className='sr-only'>Toggle Dark Mode</span>
            {icon}
          </Toggler>
        </div>
      </header>
    </div>
  )
}

export default Header
