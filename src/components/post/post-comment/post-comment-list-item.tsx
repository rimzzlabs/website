import { useMediaMinWidth } from '@/hooks/use-media-min-width'
import { useUser } from '@/hooks/use-user'

import { tw } from '@/utils/common'
import { formatDistance } from '@/utils/date'

import { useDeleteComment } from '@/queries/comment'
import { deleteDialogAtom } from '@/store/delete-dialog'
import { drawerConfirmationAtom } from '@/store/drawer'
import type { TComment } from '@/types/comment'

import htmr from 'htmr'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { P, match } from 'ts-pattern'

export const PostCommentListItem = (props: TComment) => {
  const userSession = useUser()
  const isDekstopDevice = useMediaMinWidth(768)
  const mutation = useDeleteComment({ commentId: props.id, slug: props.slug })
  const setDeleteDialog = useSetAtom(deleteDialogAtom)
  const setDrawerConfirmation = useSetAtom(drawerConfirmationAtom)

  const onClickDeleteButton = () => {
    const description =
      "I mean it's up to you. But this action will permanently delete your comment!"
    const title = 'Delete comment?'

    if (isDekstopDevice) {
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
      open: true,
      body: description,
      text: { no: 'Nevermind', yes: 'Delete' },
      async onConfirm() {
        await mutation.mutateAsync()
      },
    })
  }
  const user = match(props.user)
    .with(P.nullish, () => null)
    .otherwise((user) => user)

  const userInfo = match(user)
    .with({ image: P.not(P.nullish), name: P.not(P.nullish) }, (user) => {
      return (
        <div className='inline-flex items-start'>
          <Image
            width={28}
            height={28}
            sizes='(min-width: 1px) 28px,(min-width: 640px) 128px'
            src={user.image}
            alt={user.name}
            className='rounded-full object-cover'
          />
          <div className='ml-2.5'>
            <p className='font-semibold leading-none'>{user.name}</p>
            <time className='text-sm text-base-500' dateTime={props.createdAt}>
              {formatDistance(props.createdAt)}
            </time>
          </div>
        </div>
      )
    })
    .otherwise(() => null)

  const buttonDelete = match({ user, userSession })
    .with({ userSession: P.not(P.nullish), user: P.not(P.nullish) }, (data) => {
      return match(data.userSession)
        .with({ email: P.string.includes(data?.user?.email ?? '') }, () => (
          <button
            onClick={onClickDeleteButton}
            className='ml-auto text-sm font-medium text-red-500'
          >
            Delete
          </button>
        ))
        .otherwise(() => null)
    })
    .otherwise(() => null)

  return (
    <div
      className={tw(
        'py-1.5 px-2 rounded border',
        'bg-base-100 dark:bg-base-800',
        'border-base-200 dark:border-base-700',
      )}
    >
      <div className='flex items-start mb-2.5 pt-1.5 px-2'>
        {userInfo} {buttonDelete}
      </div>

      <div
        className={tw(
          'py-1.5 px-2 max-w-none',
          'prose prose-sm prose-neutral dark:prose-invert',
          'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
          'prose-h1:mb-[0.45em] prose-h2:mb-[0.45em] prose-h2:mt-[0.25em] prose-h3:mb-[0.45em]',
          'prose-p:mt-[0.25em]',
          'bg-inherit dark:bg-inherit',
        )}
      >
        {htmr(props.body)}
      </div>
    </div>
  )
}
