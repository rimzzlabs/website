'use client'

import { useWindowYAxis } from '@/hooks/use-win-y-axis'

import { tw } from '@/utils/common'

import { HeaderDrawerMenuTrigger } from './header-drawer-menu-trigger'
import { HeaderLogo } from './header-logo'
import { HeaderNavbar } from './header-navbar'
import { HeaderRssFeed } from './header-rss-feed'
import { HeaderThemeSelector } from './header-theme-selector'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const DrawerMenu = dynamic(() =>
  import('@/components/drawer-menu').then((m) => ({ default: m.DrawerMenu })),
)

type HeaderProps = {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const y = useWindowYAxis()
  const pathname = usePathname()

  return (
    <header
      className={tw(
        'fixed top-0 inset-x-0 z-[999]',
        'border-b border-transparent transition-[background-color,border-color]',
        'bg-white dark:bg-base-900',
        y > 65 && 'border-base-200 dark:border-base-800',
      )}
    >
      <div
        className={tw(
          'flex items-center',
          'justify-end md:justify-start',
          'h-16 gap-1',
          'layout',
          pathname.includes('/blog/') && 'lg:max-w-5xl',
          props.className,
        )}
      >
        <HeaderLogo />
        <HeaderNavbar />

        <div className='flex items-center gap-1.5'>
          <HeaderRssFeed />
          <HeaderThemeSelector />
          <HeaderDrawerMenuTrigger />
        </div>

        <DrawerMenu />
      </div>
    </header>
  )
}
