import { formatReadableDate } from '@/utils/date'
import { tw } from '@/utils/tw'

import type { TComment } from '@/types/comment'

import htmr from 'htmr'
import Image from 'next/image'
import { P, match } from 'ts-pattern'

export const PostCommentListItem = (props: TComment) => {
  const userInfo = match(props.user)
    .with({ image: P.not(P.nullish), name: P.not(P.nullish) }, (user) => {
      return (
        <div className='inline-flex items-center space-x-2'>
          <Image
            width={24}
            height={24}
            src={user.image}
            alt={user.name}
            className='rounded object-cover'
          />
          <p className='font-semibold'>{user.name}</p>
        </div>
      )
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
      <div className='flex items-center mb-2.5 pt-1.5 px-2'>
        {userInfo}

        <p className='font-sembold text-sm ml-auto text-base-600 dark:text-base-500'>
          at <time dateTime={props.createdAt}>{formatReadableDate(props.createdAt)}</time>
        </p>
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
