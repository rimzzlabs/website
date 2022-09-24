import { ThemeButton } from '@/UI/buttons'
import { DrawerButton } from '@/UI/drawer'
import { useMediaQuery, useWindowScrollY } from '@/hooks'
import { twclsx } from '@/libs/twclsx'

import { Nav } from './Nav'

import { useRouter } from 'next/router'

export const Header: React.FunctionComponent = () => {
  const { pathname } = useRouter()
  const scrollPos = useWindowScrollY()
  const mdscreen = useMediaQuery('(min-width: 768px)')

  const isError = pathname === '/_error' || pathname === '/404' || pathname === '/resume'

  if (isError) return null

  return (
    <header
      className={twclsx(
        'fixed inset-0',
        'h-20 border-b transition z-10',
        'bg-theme-50 dark:bg-theme-900',
        '[@supports(backdrop-filter:blur(0))]:bg-theme-50/80 dark:[@supports(backdrop-filter:blur(0))]:bg-theme-900/80',
        '[@supports(backdrop-filter:blur(0))]:backdrop-blur',
        scrollPos > 68 ? 'border-theme-300 dark:border-theme-700' : 'border-transparent'
      )}
    >
      <div
        className={twclsx(
          'relative',
          'h-2 w-full',
          'bg-gradient-to-r',
          'from-primary-500 to-ternary-500',
          'before:absolute before:inset-0 before:bg-gradient-to-r',
          'before:from-primary-500 before:to-violet-500',
          'before:animate-pulse'
        )}
      />

      <div className={twclsx('layout h-full pb-2', 'flex items-center justify-between')}>
        {mdscreen && <Nav />}

        <DrawerButton />

        <ThemeButton />
      </div>
    </header>
  )
}
