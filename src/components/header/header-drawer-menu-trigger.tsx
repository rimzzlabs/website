'use client'

import { tw } from '@/utils/common'

import { drawerMenuAtom } from '@/store/drawer'

import { useAtomValue, useSetAtom } from 'jotai'
import { MenuIcon, XIcon } from 'lucide-react'

export function HeaderDrawerMenuTrigger() {
  const isDrawerOpen = useAtomValue(drawerMenuAtom.value)
  const toggleDrawer = useSetAtom(drawerMenuAtom.toggle)

  return (
    <button
      onClick={toggleDrawer}
      aria-label='Open or close drawer'
      className={tw(
        'inline-flex md:hidden items-center justify-center',
        'w-8 h-8 rounded flex-shrink-0',
        'motion-safe:transition dark:bg-base-900',
        'hover:bg-base-100 active:bg-base-200',
        'dark:hover:bg-base-800 dark:active:bg-base-950',
      )}
    >
      {isDrawerOpen ? (
        <XIcon size={16} className='dark:text-base-50' />
      ) : (
        <MenuIcon size={16} className='dark:text-base-50' />
      )}
      <span className='sr-only'>Open/Close drawer</span>
    </button>
  )
}
