import { supabaseClient } from '@/services/supabase'

import { User } from '@supabase/supabase-js'
import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

export const atomGuestbookUser = atom<User | null>(null)

const getGuestbookUser = atom(null as User | null, async (get, set) => {
  const { data } = await supabaseClient.auth.getUser()
  set(atomGuestbookUser, data.user)
})

export const useGuestbookUser = () => {
  const [user] = useAtom(atomGuestbookUser)
  const [, getUser] = useAtom(getGuestbookUser)

  const signin = useCallback((provider: 'google' | 'github') => {
    return async () =>
      await supabaseClient.auth.signInWithOAuth({
        provider,
        options: { redirectTo: 'https://rizkicitra.dev/guestbook' }
      })
  }, [])

  return { signin, user, getUser }
}
