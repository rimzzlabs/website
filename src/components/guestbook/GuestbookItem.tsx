import { UnstyledButton } from '@/UI/buttons'

import { dateFormat } from '@/libs/intl'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook } from '@/hooks/guestbook/model'

const config: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'long'
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
      <p className='mb-3 max-w-prose'>{props.message}</p>
      <p className='text-sm'>
        <span className='font-bold text-theme-700 dark:text-theme-500'>{props.name} — </span>
        <span className='font-medium text-theme-400 dark:text-theme-600'>
          {date} at {hour}
        </span>
      </p>

      {user?.id === props.user_id && (
        <UnstyledButton
          type='button'
          disabled={isDeleting}
          onClick={handleDelete(props.message_id)}
          className='text-sm font-medium text-red-600 dark:text-red-700'
        >
          Delete
        </UnstyledButton>
      )}
    </div>
  )
}
