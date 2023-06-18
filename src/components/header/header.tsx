'use client'

import { tw } from '@/utils/tw'

import { Navbar } from './navbar'
import { NavbarMobile } from './navbar-mobile'
import { HeaderThemeSelector } from './theme-selector'

export const Header = () => {
  return (
    <header
      className={tw(
        'fixed top-0 inset-x-0 z-[999]',
        'border-b border-transparent',
        'bg-base-50 dark:bg-base-950',
      )}
    >
      <div
        className={tw(
          'flex items-center',
          'justify-end md:justify-between',
          'h-16 space-x-1',
          'layout',
        )}
      >
        <Navbar />

        <HeaderThemeSelector />
        <NavbarMobile />
      </div>
    </header>
  )
}
