// import useNavMobile from '@/hooks/useNavMobile'
import useTheme from '@/hooks/useTheme'
import { routes } from '@/utils/constant'
import clsx from 'clsx'
// import { AnimatePresence, m, Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { BiMenu, BiX } from 'react-icons/bi'
import NextLink from './NextLink'
import Toggler from './Toggler'

const Header = () => {
  const { changeTheme, icon } = useTheme()
  // const { isOpen, handleClick } = useNavMobile()

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

  const { asPath } = useRouter()

  // const navbarTransition: Variants = {
  //   hidden: { opacity: 0, y: 25 },
  //   enter: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.25, ease: 'easeInOut' }
  //   },
  //   exit: {
  //     opacity: 0,
  //     y: 50,
  //     transition: { duration: 0.25, ease: 'easeInOut' }
  //   }
  // }
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
              className={clsx(
                'relative z-[1] before:absolute before:left-0 before:bottom-0 before:w-full before:z-[-1] before:transition-all before:duration-150 hover:before:h-1 before:bg-primary-500 dark:before:bg-rose-500 hover:before:bg-primary-500 dark:hover:before:bg-rose-500',
                asPath === route.path ? 'before:h-1' : 'before:h-0'
              )}
              key={idx + route.path}>
              {route.name}
            </NextLink>
          ))}
        </nav>

        {/* <AnimatePresence>
          {isOpen && (
            <m.div
              initial='hidden'
              animate='enter'
              exit='exit'
              variants={navbarTransition}
              className='absolute md:hidden right-4 sm:right-6 top-14 w-8/12 sm:w-1/2 rounded overflow-hidden'>
              <nav
                className={clsx(
                  'flex flex-col',
                  'w-full h-32 rounded border',
                  'border-gray-300 dark:border-dark-700',
                  'bg-white dark:bg-dark-900'
                )}>
                {routes.map((route, idx) => (
                  <NextLink
                    className={clsx(
                      'flex items-center text-xs sm:text-sm',
                      'pl-3 sm:pl-5 w-full h-full',
                      'hover:bg-primary-400 hover:text-white'
                    )}
                    href={route.path}
                    onClick={handleClick}
                    key={idx + route.path}>
                    {route.name}
                  </NextLink>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence> */}

        <div className='flex flex-row-reverse md:flex-row items-center'>
          {/* <Toggler className='md:hidden' onClick={handleClick}>
            <span className='sr-only'>Open Navbar</span>
            {!isOpen ? <BiMenu /> : <BiX />}
          </Toggler> */}
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
