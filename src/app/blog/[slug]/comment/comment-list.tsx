import type { Comment } from '@/domains/comment'

import { formatReadableDate } from '@/utils/date'

import htmr from 'htmr'
import { P, match } from 'ts-pattern'

export const CommentList = (props: { comments: Comment[] | null }) => {
  return match(props.comments)
    .with(P.nullish, () => (
      <div className='max-w-prose py-16 text-center'>
        <p>Be the first to comment!</p>
      </div>
    ))
    .with(P.array(), (comments) =>
      match([comments.length, comments])
        .with([P.gt(0), P.select()], (comments) => (
          <div className='max-w-prose mb-2 divide-y divide-base-200 dark:divide-base-700'>
            {comments.map((comment) => {
              return (
                <div key={comment.id} className='py-4 first-of-type:pt-unset last-of-type:pb-unset'>
                  <div className='w-full flex items-center space-x-2 mb-2'>
                    <p className='font-semibold text-sm'>
                      {comment.user_name} - at {formatReadableDate(comment.created_at)}
                    </p>
                  </div>

                  {htmr(comment.body)}
                </div>
              )
            })}
          </div>
        ))
        .otherwise(() => (
          <div className='max-w-prose py-16 text-center'>
            <p>Be the first to comment!</p>
          </div>
        )),
    )
    .exhaustive()
}
