'use client'

import { useAuth } from '@/hooks/use-auth'

import { tw } from '@/utils/tw'

import { useMutateReactions, useReactions } from '@/queries/reactions'
import { signInDialogAtom } from '@/store/signin'

import type { ETReactionItem } from './post-reaction'

import { useSetAtom } from 'jotai'
import { useState } from 'react'

export const PostReactionItem = (props: ETReactionItem & { slug: string }) => {
  const [, isSignedIn] = useAuth()
  const setModalSignin = useSetAtom(signInDialogAtom)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reactions = useReactions(props.slug)
  const mutation = useMutateReactions()

  const [d, sD] = useState(false)

  const onClick = async () => {
    if (!isSignedIn) {
      setModalSignin(true)
      return
    }
    sD(true)
    try {
      await mutation.mutateAsync({ name: props.name, slug: props.slug })
    } catch (err) {
      console.info(err)
    } finally {
      sD(false)
    }
  }

  return (
    <button
      disabled={d}
      onClick={onClick}
      className={tw(
        [
          'relative',
          'flex items-center',
          'p-1.5 rounded-md align-middle',
          'border motion-safe:transition',
        ],
        [
          'bg-base-100 dark:bg-base-800',
          'border-base-300 dark:border-base-700',
          'hover:bg-base-200 dark:hover:bg-base-700',
          'active:bg-base-300 dark:active:bg-base-800',
        ],
        d && 'cursor-wait',
        // props.count > 0 && [
        //   `before:absolute before:content-[attr(data-count)]`,
        //   'before:text-xs/none',
        //   'before:rounded-full before:py-1 before:px-1.5',
        //   'before:-top-2 before:-right-1',
        //   'before:bg-rose-500 before:text-white',
        // ],
      )}
    >
      <props.icon size={20} />
      <span className='ml-1.5'>1500</span>
      <span className='sr-only'>Reaction {props.name}</span>
    </button>
  )
}
