'use client'

import { useIsSmallDevice } from '@/hooks/use-is-small-device'

import { NAVBAR_ROUTES } from '@/constants/route'
import { drawerMenuAtom } from '@/store/drawer'

import { BaseDrawer } from '../drawer'
import { DrawerMenuItem } from './drawer-menu-item'
import { DrawerMenuOther } from './drawer-menu-other'
import { DrawerMenuThemeSelector } from './drawer-menu-theme-selector'

import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { match } from 'ts-pattern'

export function DrawerMenu() {
  const isDrawerOpen = useAtomValue(drawerMenuAtom.value)
  const closeDrawer = useSetAtom(drawerMenuAtom.disable)
  const isSmallDevice = useIsSmallDevice()
  const snapPoints = match(isSmallDevice)
    .with(true, () => [0.4, 0.72, 1])
    .otherwise(() => [0.35, 0.65, 1])

  const [snap, setSnap] = useState<React.Key | null | undefined>(snapPoints[0])

  return (
    <BaseDrawer
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      className='rounded-t-md border-t-2 dark:border-t-base-700 max-h-[97%]'
      onClose={closeDrawer}
      open={isDrawerOpen}
    >
      <div className='flex flex-col'>
        <p className='px-4 pb-2 font-bold text-lg'>Menu</p>
        {NAVBAR_ROUTES.map((item) => {
          return <DrawerMenuItem key={item.href} {...item} />
        })}
      </div>
      <DrawerMenuThemeSelector />

      <DrawerMenuOther />
    </BaseDrawer>
  )
}
