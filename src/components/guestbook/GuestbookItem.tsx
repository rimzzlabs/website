import { UnstyledButton } from '@/UI/buttons'

import { dateFormat } from '@/libs/intl'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook } from '@/hooks/guestbook/model'

import { RiUserVoiceLine } from 'react-icons/ri'

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
    <div className='w-full py-5 px-4'>
      <div className='flex items-start space-x-2.5'>
        <RiUserVoiceLine />

        <div className='-mt-1'>
          <p className='mb-3 max-w-prose font-bold'>{props.message}</p>
          <p className='text-sm'>
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
      </div>
    </div>
  )
}
