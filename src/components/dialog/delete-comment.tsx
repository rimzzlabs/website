'use client'

import { usePostSlug } from '@/hooks/use-post-slug'

import { tw } from '@/utils/common'

import { useDeleteComment } from '@/queries/comment'
import { commmentIdAtom } from '@/store/signin'

import { BaseDialog } from './base'

import { useAtom } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

export const DeleteCommentDialog = () => {
  const [commentId, setCommmentId] = useAtom(commmentIdAtom)
  const [isLoading, setIsLoading] = useState(false)
  const slug = usePostSlug()
  const mutation = useDeleteComment({ commentId, slug })

  const onDeleteComment = async () => {
    setIsLoading(true)
    try {
      await mutation.mutateAsync()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setCommmentId(null)
    }
  }

  return (
    <BaseDialog
      open={!!commentId}
      title='Delete Comment'
      description='Are you sure you want to delete your comment?. Your comment will be permanently removed from my post!'
      onClose={() => setCommmentId(null)}
      body={({ onClose }) => (
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className={tw(
              'inline-flex items-center justify-center',
              'h-8 px-4 text-sm font-medium rounded ml-2 order-2',
              'bg-primary-600 text-white',
              'hover:bg-primary-700 active:bg-primary-800',
            )}
          >
            Nevermind
          </button>
          <button
            onClick={onDeleteComment}
            disabled={isLoading}
            className={tw(
              'inline-flex items-center justify-center',
              'h-8 px-4 text-sm font-medium rounded order-1',
              'bg-red-600 text-white',
              'hover:bg-red-700 active:bg-red-800',
            )}
          >
            {isLoading && <Loader2Icon size='0.875rem' className='mr-1.5 animate-spin' />}
            <span>{isLoading ? 'Deleting' : 'Delete'}</span>
          </button>
        </div>
      )}
    />
  )
}
