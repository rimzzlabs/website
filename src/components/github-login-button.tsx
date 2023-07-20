'use client'

import { tw } from '@/utils/tw'

import { signIn } from 'next-auth/react'
import { SiGithub } from 'react-icons/si'

type Props = {
  className?: string
}

export const GithubLoginButton = (props: Props) => {
  return (
    <button
      onClick={() => signIn('github')}
      className={tw(
        'inline-flex items-center',
        'h-9 px-4 text-sm',
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
