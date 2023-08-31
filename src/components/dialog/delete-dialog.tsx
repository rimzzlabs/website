'use client'

import { tw } from '@/utils/common'

import { closeDeleteDialogAtom, deleteDialogAtom } from '@/store/delete-dialog'

import { BaseDialog } from './base'

import { useAtomValue, useSetAtom } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

export const DeleteDialog = () => {
  const [isLoading, setIsLoading] = useState(false)

  const state = useAtomValue(deleteDialogAtom)
  const onClose = useSetAtom(closeDeleteDialogAtom)

  const onDeleteComment = async () => {
    setIsLoading(true)
    try {
      await state.onConfirm()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <BaseDialog
      open={state.open}
      title={state.title}
      description={state.description}
      onClose={onClose}
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
