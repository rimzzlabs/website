'use client'

import { Skeleton } from '@/components/skeleton'

import { useIntersection } from '@/hooks/use-intersection'
import { usePostSlug } from '@/hooks/use-post-slug'

import { useComments } from '@/queries/comment'

import { PostCommentListItem } from './post-comment-list-item'

import { useRef } from 'react'
import { P, match } from 'ts-pattern'

export const PostCommentList = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useIntersection(ref)
  const slug = usePostSlug()
  const query = useComments(slug, isInView)

  const count = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => comments.length)
    .otherwise(() => 0)

  const totalComments = match(count)
    .with(0, () => 'Be the first to comment')
    .with(1, () => '1 comment')
    .otherwise(() => `${count} comments`)

  const renderList = match(query)
    .with({ status: 'success', data: { data: P.select() } }, (comments) => {
      return comments.map((comment) => {
        return <PostCommentListItem key={comment.id} {...comment} />
      })
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
    .otherwise(() => <p>Something went wrong 😢</p>)

  return (
    <div ref={ref}>
      {query.status === 'loading' && <Skeleton className='w-44 h-5 mb-4' />}
      {query.status === 'error' && <p className='text-sm font-semibold mb-4'>-</p>}
      {query.status === 'success' && <p className='text-sm font-semibold mb-4'>{totalComments}</p>}
      <div className='flex flex-col space-y-4'>{renderList}</div>
    </div>
  )
}
