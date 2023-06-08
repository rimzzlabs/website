'use client'

import { tw } from '@/utils/tw'

import { HeaderThemeSelector } from './header-theme-selector'
import { Navbar } from './navbar'

export const Header = () => {
  return (
    <header
      className={tw(
        'fixed top-0 inset-x-0 z-[999]',
        'border-b border-transparent',
        'bg-base-50 dark:bg-base-900',
      )}
    >
      <div className={tw('flex items-center justify-between', 'h-16', 'layout')}>
        <Navbar />

        <HeaderThemeSelector />
      </div>
    </header>
  )
}
