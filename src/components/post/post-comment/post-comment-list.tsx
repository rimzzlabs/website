'use client'

import { Skeleton } from '@/components/skeleton'

import { usePostSlug } from '@/hooks/use-post-slug'

import { useComments } from '@/queries/comment'

import { PostCommentListItem } from './post-comment-list-item'
import { PostCommentListPlaceholder } from './post-comment-list-placeholder'

import { P, match } from 'ts-pattern'

export const PostCommentList = () => {
  const slug = usePostSlug()
  const query = useComments(slug)

  const count = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => comments.length)
    .otherwise(() => 0)

  const commentsCount = match(count)
    .with(0, () => null)
    .with(1, () => '1 comment')
    .otherwise(() => `${count} comments`)

  const list = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => {
      return match(comments.length)
        .with(P.number.gt(0), () =>
          comments.map((comment) => <PostCommentListItem key={comment.id} {...comment} />),
        )
        .otherwise(() => <PostCommentListPlaceholder />)
    })
    .with({ status: 'loading' }, () => {
      return (
        <>
          <Skeleton className='w-full h-20' />
          <Skeleton className='w-full h-20' />
          <Skeleton className='w-full h-20' />
        </>
      )
    })
    .otherwise(() => <p>Couldn&apos;t fetch comments😢</p>)

  return (
    <div>
      {query.status === 'loading' && <Skeleton className='w-44 h-5 mb-4' />}
      {query.status === 'success' && <p className='text-sm font-semibold mb-4'>{commentsCount}</p>}
      <div className='flex flex-col space-y-4'>{list}</div>
    </div>
  )
}
