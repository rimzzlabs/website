'use client'

import { useGuestbook } from '@/queries/guestbook'
import type { TGuestbook } from '@/types/guestbook'

import { Placeholder } from '../placeholder'
import { GuestbookListItem } from './guestbook-list-item'

import { match } from 'ts-pattern'

export const GuestbookList = async (props: { guestbook: TGuestbook[] }) => {
  const query = useGuestbook(props.guestbook)

  const ui = match(query)
    .with({ status: 'error' }, () => (
      <p className='text-center'>Could not fetch guestbook, please try again later</p>
    ))
    .otherwise((query) => {
      return match(query.data.data.length)
        .with(0, () => (
          <Placeholder
            image={{ height: 165, width: 165 }}
            messageClassName='mt-4 text-base'
            message='Be the first to sign!'
          />
        ))
        .otherwise(() => (
          <section className='space-y-2'>
            {query.data.data.map((item) => {
              return <GuestbookListItem key={item.id} {...item} />
            })}
          </section>
        ))
    })

  return ui
}
