import { UnstyledButton } from '@/UI/buttons'

import { dateFormat } from '@/libs/intl'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook } from '@/hooks/guestbook/model'

const config: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'short'
}

const hourConfig: Intl.DateTimeFormatOptions = {
  hour12: true,
  hour: 'numeric',
  minute: 'numeric'
}

export const GuestbookItem: React.FunctionComponent<Guestbook> = (props) => {
  const { user } = useGuestbookUser()
  const { handleDelete, isDeleting } = useGuestbook()

  const date = dateFormat(props.created_at, 'en-US', config)
  const hour = dateFormat(props.created_at, 'en-US', hourConfig)

  return (
    <div className='w-full'>
      <p className='max-w-prose font-bold'>{props.message}</p>
      <p className='text-sm mt-3'>
        <span className='font-semibold dark:text-theme-400'>{props.name} — </span>
        <span className='text-theme-500 dark:text-theme-600'>
          {date} at {hour}
        </span>
      </p>

      {user?.id === props.user_id && (
        <UnstyledButton
          type='button'
          disabled={isDeleting}
          onClick={handleDelete(props.message_id)}
          className='text-sm mt-2.5 font-medium text-red-600 dark:text-red-700'
        >
          Delete
        </UnstyledButton>
      )}
    </div>
  )
}
