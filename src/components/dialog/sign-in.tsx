'use client'

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
      body={<GithubSigninButton />}
    />
  )
}
