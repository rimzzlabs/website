'use client'

import { useWindowYAxis } from '@/hooks/use-win-y-axis'

import { tw } from '@/utils/tw'

import { signInDialogAtom } from '@/store/signin'

import { Navbar } from './navbar'
import { NavbarMobile } from './navbar-mobile'
import { HeaderThemeSelector } from './theme-selector'

import { useAtomValue } from 'jotai'

type HeaderProps = {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const y = useWindowYAxis()
  const isDialogOpen = useAtomValue(signInDialogAtom)

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
          isDialogOpen && 'w-[calc(100%)-1rem]',
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
