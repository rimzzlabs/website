import { UnstyledButton } from '@/UI/buttons'

import { dateFormat } from '@/libs/intl'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook } from '@/hooks/guestbook/model'

import { HiOutlineCalendar, HiOutlineUserCircle } from 'react-icons/hi'

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
    <div className='w-full py-3'>
      <p className='mb-3 max-w-prose font-bold'>{props.message}</p>
      <div className='flex items-center space-x-1.5'>
        <HiOutlineUserCircle className='w-3.5 h-3.5' />
        <span className='text-sm font-semibold dark:text-theme-400'>{props.name}</span>
      </div>

      <div className='flex items-center space-x-1.5'>
        <HiOutlineCalendar className='w-3.5 h-3.5' />
        <span className='text-sm font-semibold dark:text-theme-400'>
          On {date} at {hour}
        </span>
      </div>

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
