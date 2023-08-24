'use client'

import { useMutateComment } from '@/queries/comment'

import { CommentEditor } from './editor'

export const PostCommentEditor = () => {
  const { mutateAsync } = useMutateComment()

  return (
    <CommentEditor onSubmitMutation={(payload) => mutateAsync({ ...payload, type: 'comment' })} />
  )
}
