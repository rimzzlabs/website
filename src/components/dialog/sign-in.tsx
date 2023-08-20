'use client'

import { tw } from '@/utils/tw'

import { signInDialogAtom } from '@/store/signin'

import { GithubSigninButton } from '../github-signin-button'
import { BaseDialog } from './base'

import { useAtom } from 'jotai'

export const SignInDialog = () => {
  const [open, setModal] = useAtom(signInDialogAtom)

  const onClose = () => setModal((p) => !p)
  return (
    <BaseDialog
      title='Howdyy!'
      description='You have to sign in to interact with my website!'
      onClose={onClose}
      open={open}
      body={(bodyProps) => {
        return (
          <>
            <GithubSigninButton />
            <button
              className={tw(
                'flex items-center mt-2',
                'h-9 px-4 text-sm max-w-max',
                'rounded border transition',
                'bg-base-800 border-base-700 text-white',
                'hover:bg-base-700 hover:border-base-600',
                'active:bg-base-800 active:border-base-700',
                'disabled:active:bg-base-800 disabled:hover:bg-base-800',
              )}
              onClick={bodyProps.onClose}
            >
              Maybe later
            </button>
          </>
        )
      }}
    />
  )
}
