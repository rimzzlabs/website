import useTheme from '@/hooks/useTheme'
import { routes } from '@/utils/constant'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NextLink from './NextLink'
import Toggler from './Toggler'

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
    <div
      className={clsx(
        'fixed top-0 left-0 w-full z-[99]',
        'dark:bg-dark-900/80 backdrop-blur-md'
      )}>
      <div
        className={clsx(
          'w-full h-2 bg-gradient-to-r',
          'from-rose-500 via-indigo-500 to-primary-500'
        )}
      />

      <header
        className={clsx(
          'layout h-12 md:h-16',
          'flex items-center md:space-x-0 justify-between'
        )}>
        <nav className={clsx('flex items-center space-x-4 2xl:space-x-5')}>
          {routes.map((route, idx) => (
            <NextLink
              href={route.path}
              key={idx + route.path}
              className={clsx(
                'relative z-[1] after:absolute after:w-full',
                'after:left-0 after:bottom-0 after:z-[-1] after:transition-all duration-300',
                'after:bg-primary-500 dark:after:bg-rose-500',
                pathname === route.path ? 'after:h-1' : 'after:h-0'
              )}>
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
