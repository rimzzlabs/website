'use client'

import { Placeholder } from '@/components/placeholder'

import { useComments } from '@/queries/comment'
import type { TComment } from '@/types/comment'

import { PostCommentListItem } from './post-comment-list-item'

import { P, match } from 'ts-pattern'

export const PostCommentList = (props: { comments: TComment[]; slug: string }) => {
  const query = useComments({
    data: props.comments,
    message: 'loading',
    slug: props.slug,
  })

  const count = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => comments.length)
    .otherwise(() => 0)

  const commentsCount = match(count)
    .with(0, () => null)
    .with(1, () => <p className='text-sm font-semibold mb-4'>1 comment</p>)
    .otherwise(() => <p className='text-sm font-semibold mb-4'>{`${count} comments`}</p>)

  const list = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => {
      return match(comments.length)
        .with(P.number.gt(0), () =>
          comments.map((comment) => <PostCommentListItem key={comment.id} {...comment} />),
        )
        .otherwise(() => <Placeholder message='Be the first to comment on this post!' />)
    })
    .otherwise(() => <p>Couldn&apos;t fetch comments😢</p>)

  return (
    <div>
      {query.status === 'success' && commentsCount}
      <div className='flex flex-col space-y-4'>{list}</div>
    </div>
  )
}
