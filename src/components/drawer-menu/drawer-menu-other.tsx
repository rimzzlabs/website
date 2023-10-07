import { useAuth } from '@/hooks/use-auth'

import { tw } from '@/utils/common'

import { drawerConfirmationAtom, drawerMenuAtom } from '@/store/drawer'

import { useSetAtom } from 'jotai'
import { signOut } from 'next-auth/react'

export function DrawerMenuOther() {
  const isAuth = useAuth()
  const closeDrawerMenu = useSetAtom(drawerMenuAtom.disable)
  const openDrawerConfirmation = useSetAtom(drawerConfirmationAtom)

  const onClick = () => {
    openDrawerConfirmation({
      open: true,
      text: { yes: 'Sign out', no: 'Nevermind' },
      title: 'Sign out confirmation',
      body: 'Are you sure you want to sign out?',
      onConfirm: () => signOut(),
    })
    closeDrawerMenu()
  }

  if (!isAuth) return null

  return (
    <div className='pt-4 px-4'>
      <p className='pb-4 font-semibold text-lg'>Other</p>

      <button
        onClick={onClick}
        className={tw(
          'flex items-center justify-center',
          'w-full px-4 py-3 border rounded-md motion-safe:transition',
          'bg-base-800 text-white border-base-700',
          'dark:bg-base-700 dark:border-base-600',
          'hover:bg-base-900 active:bg-base-950',
          'hover:dark:bg-base-900 active:dark:bg-base-950',
        )}
      >
        Sign Out
      </button>
    </div>
  )
}
