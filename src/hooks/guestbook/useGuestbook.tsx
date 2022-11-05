import { supabaseClient } from '@/services/supabase'

import { Guestbook } from './model'
import { useGuestbookUser } from './useGuestbookUser'

import { atom, useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const atomGuestbook = atom<Guestbook[]>([])

const getAtomGuestbook = atom(null, async (get, set) => {
  const { data, error } = await supabaseClient.from<'guestbook', Guestbook>('guestbook').select('*')
  if (error) return
  set(atomGuestbook, data as Guestbook[])
})

export const useGuestbook = () => {
  const [guestbook, sG] = useAtom(atomGuestbook)
  const [, getGuestbook] = useAtom(getAtomGuestbook)
  const { user } = useGuestbookUser()
  const [message, setMessage] = useState('')
  const [isDeleting, deleting] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      const payload = {
        user_id: user?.id as string,
        name: user?.user_metadata.name ?? user?.user_metadata.user_name,
        message: message
      }
      const toastId = toast.loading('Posting your message...')
      const insert = await supabaseClient.from('guestbook').insert([payload])
      toast.remove(toastId)
      if (insert.error) {
        toast.error(insert.error.message || 'Cannot post message, try again later')
        setMessage('')
        return
      }
      await getGuestbook()
      toast.success('Hooray🎉\nThank you for signing my guestbook!', { duration: 5000 })
      setMessage('')
    },
    [user, message, getGuestbook]
  )
  const handleDelete = useCallback(
    (id: string) => {
      return async () => {
        deleting(true)
        const res = await supabaseClient.from('guestbook').delete({ count: 'exact' }).eq('message_id', `${id}`)
        if (res.error) {
          deleting(false)
          return
        }
        sG((prev) => prev.filter((guest) => guest.message_id !== id))
        deleting(false)
      }
    },
    [sG]
  )
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value), [])

  return {
    guestbook: guestbook.sort((a, b) =>
      new Date(a.created_at) < new Date(b.created_at) ? 1 : new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
    ),
    getGuestbook,
    handleSubmit,
    handleChange,
    message,
    handleDelete,
    isDeleting
  }
}
