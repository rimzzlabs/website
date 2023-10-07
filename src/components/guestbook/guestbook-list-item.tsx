'use client'

import { useMediaMinWidth } from '@/hooks/use-media-min-width'
import { useUser } from '@/hooks/use-user'

import { tw } from '@/utils/common'
import { formatDistance } from '@/utils/date'

import { useDeleteGuestbook } from '@/queries/guestbook'
import { deleteDialogAtom } from '@/store/delete-dialog'
import { drawerConfirmationAtom } from '@/store/drawer'
import type { TGuestbook } from '@/types/guestbook'

import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { P, match } from 'ts-pattern'

export const GuestbookListItem = (props: TGuestbook) => {
  const user = useUser()
  const mutation = useDeleteGuestbook({ guestbookId: props.id })

  const isDesktopdevice = useMediaMinWidth(768)
  const setDeleteDialog = useSetAtom(deleteDialogAtom)
  const setDrawerConfirmation = useSetAtom(drawerConfirmationAtom)

  const handleDeleteButton = () => {
    const title = 'Delete message?'
    const description =
      "I mean it's up to you. But this action will permanently delete your message!"

    if (isDesktopdevice) {
      setDeleteDialog({
        open: true,
        title,
        description,
        async onConfirm() {
          await mutation.mutateAsync()
        },
      })
      return
    }
    setDrawerConfirmation({
      title,
      body: description,
      open: true,
      text: { no: 'Nevermind', yes: 'Delete' },
      async onConfirm() {
        await mutation.mutateAsync()
      },
    })
  }

  const deleteButton = match(user)
    .with({ email: P.string.includes(props.User?.email ?? '') }, () => (
      <button onClick={handleDeleteButton} className='ml-auto text-sm font-medium text-red-500'>
        Delete
      </button>
    ))
    .otherwise(() => false)

  return (
    <div
      className={tw(
        'py-3 px-4 rounded border',
        'bg-base-100 dark:bg-base-800',
        'border-base-200 dark:border-base-700',
      )}
    >
      {props.User?.image && props.User.name && (
        <div className='flex items-center mb-4'>
          <Image
            src={props.User.image}
            alt={props.User.name}
            width={32}
            height={32}
            className='rounded-full object-cover'
          />
          <div className='inline-flex flex-col ml-2.5'>
            <p>{props.User.name}</p>
            <time className='text-sm text-base-500' dateTime={props.createdAt}>
              {formatDistance(props.createdAt)}
            </time>
          </div>

          {deleteButton}
        </div>
      )}

      <p className='text-sm'>{props.message}</p>
    </div>
  )
}
