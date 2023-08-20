'use client'

import { useWindowYAxis } from '@/hooks/use-win-y-axis'

import { tw } from '@/utils/tw'

import { Navbar } from './navbar'
import { NavbarMobile } from './navbar-mobile'
import { HeaderThemeSelector } from './theme-selector'

type HeaderProps = {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const y = useWindowYAxis()

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
          'h-16 space-x-1',
          'layout',
          props.className,
        )}
      >
        <Navbar />

        <HeaderThemeSelector />
        <NavbarMobile />
      </div>
    </header>
  )
}
