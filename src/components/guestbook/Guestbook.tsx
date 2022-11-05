import { Guestbook as GuestbookType } from '@/hooks/guestbook/model'

import { GuestbookItem } from './GuestbookItem'

import { useId } from 'react'

type P = {
  guestbook: GuestbookType[]
}

export const Guestbook: React.FunctionComponent<P> = (props) => {
  const id = useId()

  if (props.guestbook.length === 0) {
    return <p>No Message...</p>
  }

  return (
    <div className='flex flex-col gap-4 md:gap-6 w-full'>
      {props.guestbook.map((g) => (
        <GuestbookItem key={g.message_id + id} {...g} />
      ))}
    </div>
  )
}
