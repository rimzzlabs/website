'use client'

import { drawerSigninAtom } from '@/store/drawer'

import { GithubSigninButton } from '../github-signin-button'
import { BaseDrawer } from './base-drawer'

import { useAtomValue, useSetAtom } from 'jotai'

export function DrawerSignin() {
  const open = useAtomValue(drawerSigninAtom.value)
  const onClose = useSetAtom(drawerSigninAtom.disable)

  return (
    <BaseDrawer onClose={onClose} open={open} className='max-h-[36%]'>
      <div className='px-4'>
        <p className='pb-2 font-bold text-lg'>Sign in confirmation</p>
        <p className='pb-4'>
          Hey, thanks for your intereset, but you have to sign in to interact with my website!
        </p>
        <GithubSigninButton className='dark:bg-base-900 dark:hover:bg-base-700 justify-center max-w-full w-full h-10' />
      </div>
    </BaseDrawer>
  )
}
