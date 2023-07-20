'use client'

import type { Comment } from '@/domains/comment'

import { P, match } from 'ts-pattern'

export const CommentsLength = ({ comments = [] }: { comments: Comment[] | null }) => {
  return match([comments, comments?.length])
    .with([P.not(P.nullish), P.not(P.nullish).and(1)], (counter) => (
      <p className='mb-4 text-sm'>{`${counter} comment`}</p>
    ))
    .with([P.not(P.nullish), P.number.and(P.gt(1)).select()], (counter) => (
      <p className='mb-4 text-sm'>{`${counter} comments`}</p>
    ))
    .otherwise(() => null)
}
