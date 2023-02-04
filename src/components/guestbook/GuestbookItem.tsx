import { UnstyledButton } from '@/UI/buttons'

import { dateFormat } from '@/libs/intl'

import { useGuestbook, useGuestbookUser } from '@/hooks'
import { Guestbook } from '@/hooks/guestbook/model'

import { useEffect, useState } from 'react'
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

const getPostedAt = (created_at: string) => {
  const date = dateFormat(created_at, 'en-GB', config)
  const hour = dateFormat(created_at, 'en-GB', hourConfig)
  return ` On ${date} at ${hour}`
}

export const GuestbookItem: React.FunctionComponent<Guestbook> = (props) => {
  const { user } = useGuestbookUser()
  const { handleDelete, isDeleting } = useGuestbook()
  const [postedAt, setPostedAt] = useState(getPostedAt(props.created_at))

  useEffect(() => {
    setPostedAt(getPostedAt(props.created_at))
  }, [props.created_at])

  return (
    <div className='w-full py-3'>
      <p className='mb-3 max-w-prose font-bold'>{props.message}</p>
      <div className='flex items-center space-x-1.5'>
        <HiOutlineUserCircle className='w-3.5 h-3.5' />
        <span className='text-sm font-semibold dark:text-theme-400'>{props.name}</span>
      </div>

      <div className='flex items-center space-x-1.5'>
        <HiOutlineCalendar className='w-3.5 h-3.5' />
        <span className='text-sm font-semibold dark:text-theme-400'>{postedAt}</span>
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
