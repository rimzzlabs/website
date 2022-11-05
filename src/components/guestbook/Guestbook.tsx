import { useGuestbook } from '@/hooks'

import { GuestbookItem } from './GuestbookItem'

import { useId } from 'react'

export const Guestbook: React.FunctionComponent = () => {
  const { guestbook } = useGuestbook()
  const id = useId()

  if (guestbook.length === 0) {
    return <p>No Message...</p>
  }

  return (
    <div className='flex flex-col gap-4 md:gap-6 w-full'>
      {guestbook.map((g) => (
        <GuestbookItem key={g.message_id + id} {...g} />
      ))}
    </div>
  )
}
