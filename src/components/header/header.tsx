'use client'

import { useWindowYAxis } from '@/hooks/use-win-y-axis'

import { tw } from '@/utils/common'

import { Navbar } from './navbar'
import { HeaderThemeSelector } from './theme-selector'

import { usePathname } from 'next/navigation'

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
          'h-16 space-x-1',
          'layout',
          pathname.includes('/blog/') && 'lg:max-w-5xl',
          props.className,
        )}
      >
        <Navbar />

        <HeaderThemeSelector />
      </div>
    </header>
  )
}
