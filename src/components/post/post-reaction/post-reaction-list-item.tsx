'use client'

import { useAuth } from '@/hooks/use-auth'
import { usePostSlug } from '@/hooks/use-post-slug'
import { useReduceMotion } from '@/hooks/use-reduce-motion'

import { tw } from '@/utils/common'
import { compactNumber } from '@/utils/number'
import { sparkConfeti } from '@/utils/party'

import { useMutateReactions, useReactions } from '@/queries/reaction'
import { signInDialogAtom } from '@/store/signin'
import type { TReactionItem } from '@/types/reaction'

import { useSetAtom } from 'jotai'
import { P, match } from 'ts-pattern'

export const PostReactionListItem = (props: TReactionItem) => {
  const isSignedIn = useAuth()
  const setModalSignin = useSetAtom(signInDialogAtom)
  const isReduceMotion = useReduceMotion()
  const slug = usePostSlug()

  const reactions = useReactions(slug)
  const mutation = useMutateReactions()

  const reaction = match(reactions)
    .with({ status: 'success', data: P.select() }, (data) => data)
    .otherwise(() => null)

  const userReactions = match(reaction)
    .with({ data: { userCounters: P.not(P.nullish).select() } }, (counter) => counter)
    .otherwise(() => null)

  const userReactionGteFive = match(userReactions)
    .with(P.not(P.nullish).and({ [props.name]: P.number.gte(5) }), () => true)
    .otherwise(() => null)

  const reactionCount = match(reaction?.data.counters)
    .with(
      P.union(
        P.not(P.nullish),
        { love: P.number.gt(0) },
        { rocket: P.number.gt(0) },
        { star: P.number.gt(0) },
      ),
      (reaction) => reaction[props.name],
    )
    .otherwise(() => null)

  const iconColor = match({ name: props.name, reactionCount })
    .with({ name: 'love', reactionCount: P.number.gt(0) }, () => 'text-red-500')
    .with({ name: 'rocket', reactionCount: P.number.gt(0) }, () => 'text-primary-500')
    .with({ name: 'star', reactionCount: P.number.gt(0) }, () => 'text-yellow-500')
    .otherwise(() => null)

  const fillIcon = match(reactionCount)
    .with(P.number.positive(), () => ({ fill: 'currentColor' }))
    .otherwise(() => ({}))

  const buttonDisabled = match({ mutation, userReactionGteFive })
    .with(P.union({ mutation: { status: 'loading' } }, { userReactionGteFive: true }), () => true)
    .otherwise(() => false)

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userReactionGteFive) return
    if (!isSignedIn) {
      setModalSignin(true)
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()

    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top - rect.height / 2 - 10) / window.innerHeight

    const origin = { x, y }
    try {
      await mutation.mutateAsync({ name: props.name, slug })
    } catch (err) {
      console.info(err)
    } finally {
      !isReduceMotion && sparkConfeti(origin)
    }
  }

  return (
    <button
      disabled={buttonDisabled}
      onClick={onClick}
      className={tw(
        'relative',
        'flex items-center',
        'px-2 h-8 text-sm rounded-md align-middle',
        'border motion-safe:transition',
        'border-base-300 dark:border-base-700',
        'bg-base-100 dark:bg-base-800',
        !userReactionGteFive && 'hover:bg-base-200 dark:hover:bg-base-700',
        !userReactionGteFive && 'active:bg-base-300 dark:active:bg-base-800',
        buttonDisabled && 'cursor-default',
      )}
    >
      <props.icon size='1.25em' className={tw(iconColor)} {...fillIcon} />
      {!!reactionCount && <span className='ml-1'>{compactNumber(reactionCount)}</span>}
      <span className='sr-only'>Reaction {props.name}</span>
    </button>
  )
}
