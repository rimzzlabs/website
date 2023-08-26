'use client'

import { tw } from '@/utils/common'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { signIn } from 'next-auth/react'

type Props = {
  className?: string
}

export const GithubSigninButton = (props: Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        signIn('github')
      }}
      className={tw(
        'inline-flex items-center',
        'h-9 px-4 text-sm max-w-max',
        'rounded border transition',
        'bg-base-800 border-base-700 text-white',
        'hover:bg-base-700 hover:border-base-600',
        'active:bg-base-800 active:border-base-700',
        'disabled:active:bg-base-800 disabled:hover:bg-base-800',
        'disabled:cursor-wait',
        props.className,
      )}
    >
      <SiGithub size={18} />
      <span className='ml-2.5'>Sign in with GitHub</span>
    </button>
  )
}
