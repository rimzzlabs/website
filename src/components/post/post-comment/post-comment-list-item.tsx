import { useUser } from '@/hooks/use-user'

import { tw } from '@/utils/common'

import { commmentIdAtom } from '@/store/signin'
import type { TComment } from '@/types/comment'

import { PostComentListItemDate } from './post-comment-list-item-date'

import htmr from 'htmr'
import { useSetAtom } from 'jotai'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { P, match } from 'ts-pattern'

export const PostCommentListItem = (props: TComment) => {
  const setCommentId = useSetAtom(commmentIdAtom)
  const userSession = useUser()

  const user = match(props.user)
    .with(P.nullish, () => null)
    .otherwise((user) => user)

  const userInfo = match(user)
    .with({ image: P.not(P.nullish), name: P.not(P.nullish) }, (user) => {
      return (
        <div className='inline-flex items-start'>
          <Image
            width={28}
            height={28}
            sizes='(min-width: 1px) 28px,(min-width: 640px) 128px'
            src={user.image}
            alt={user.name}
            className='rounded-full object-cover'
          />
          <div className='ml-2.5'>
            <p className='font-semibold leading-none'>{user.name}</p>

            <PostComentListItemDate createdAt={props.createdAt} />
          </div>
        </div>
      )
    })
    .otherwise(() => null)

  const buttonDelete = match({ user, userSession })
    .with({ userSession: P.not(P.nullish), user: P.not(P.nullish) }, (data) => {
      return match(data.userSession)
        .with({ email: P.string.includes(data?.user?.email ?? '') }, () => (
          <button
            onClick={() => setCommentId(props.id)}
            className={tw(
              'inline-flex items-center justify-center',
              'w-6 h-6 ml-auto rounded',
              'border dark:border-base-700',
              'hover:bg-red-600 hover:text-white hover:border-red-500',
            )}
          >
            <TrashIcon size='0.75rem' />
            <span className='sr-only'>Delete this comment</span>
          </button>
        ))
        .otherwise(() => null)
    })
    .otherwise(() => null)

  return (
    <div
      className={tw(
        'py-1.5 px-2 rounded border',
        'bg-base-100 dark:bg-base-800',
        'border-base-200 dark:border-base-700',
      )}
    >
      <div className='flex items-start mb-2.5 pt-1.5 px-2'>
        {userInfo} {buttonDelete}
      </div>

      <div
        className={tw(
          'py-1.5 px-2 max-w-none',
          'prose prose-sm prose-neutral dark:prose-invert',
          'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
          'prose-h1:mb-[0.45em] prose-h2:mb-[0.45em] prose-h2:mt-[0.25em] prose-h3:mb-[0.45em]',
          'prose-p:mt-[0.25em]',
          'bg-inherit dark:bg-inherit',
        )}
      >
        {htmr(props.body)}
      </div>
    </div>
  )
}
