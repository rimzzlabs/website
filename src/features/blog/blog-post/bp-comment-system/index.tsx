'use client'

import { compareDesc, formatReadableDate } from '@/utils/date'

import { BlogPostCommentForm } from './bp-cs-form'
import { AtomComments } from './store'

import { useAtomValue } from 'jotai'
import { P, match } from 'ts-pattern'

export const BlogPostComment = () => {
  const comments = useAtomValue(AtomComments)

  return (
    <div className='my-8 lg:my-14'>
      <div className='flex items-center justify-between'>
        <p>
          {match(comments.length)
            .with(P.shape(0), () => 'No comments yet')
            .with(P.shape(1), (length) => `${length} comment`)
            .with(P.gt(1), (length) => `${length} comments`)
            .otherwise(() => null)}
        </p>
      </div>

      <div className='lg:grid lg:grid-cols-[22rem,auto] lg:gap-8'>
        <BlogPostCommentForm />

        {comments.length > 0 && (
          <div className='flex flex-col space-y-2.5 max-h-[32rem] overflow-y-auto'>
            {comments
              .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
              .map((comment) => {
                return (
                  <div
                    key={comment.date}
                    className='bg-base-100 dark:bg-base-900 p-3 rounded-[0.5em]'
                  >
                    <p className='text-lg font-bold mb-2.5'>{comment.text}</p>

                    <p>
                      {comment.from} - at {formatReadableDate(comment.date)}
                    </p>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
