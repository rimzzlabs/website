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
    <section className='pt-8 md:pt-16'>
      <h2 className='mb-3 md:mb-6'>The Guest</h2>
      <div className='flex flex-col w-full pb-8 md:pb-16'>
        {props.guestbook.map((g) => (
          <GuestbookItem key={g.message_id + id} {...g} />
        ))}
      </div>
    </section>
  )
}
