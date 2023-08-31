'use client'

import { useAuth } from '@/hooks/use-auth'

import { tw } from '@/utils/common'

import { useMutateGuestbook } from '@/queries/guestbook'

import { GithubSigninButton } from '../github-signin-button'

import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

export const GuestbookForm = () => {
  const isAuthenticated = useAuth()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const mutation = useMutateGuestbook()

  const isValid = !!message.replace(/\s+/g, '')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await mutation.mutateAsync({ message })
    } catch (error) {
      console.warn(error)
    } finally {
      setIsLoading(false)
      setMessage('')
    }
  }

  if (!isAuthenticated) {
    return (
      <section className='mb-4'>
        <GithubSigninButton />
      </section>
    )
  }

  return (
    <form onSubmit={onSubmit} className='mb-8 w-full max-w-full'>
      {mutation.status === 'error' && (
        <p className='text-xs text-red-500 font-medium mb-0.5'>
          Cannot sign guestbook, please try again later
        </p>
      )}

      <textarea
        disabled={isLoading}
        value={message}
        onChange={onChange}
        className={tw(
          'block w-full px-4 py-2.5 h-20 max-h-40',
          'outline-none rounded text-sm',
          'border transition overflow-y-auto',
          'bg-base-100 dark:bg-base-800',
          'border-base-200 dark:border-base-700',
          'focus:ring-1 ring-base-300 dark:ring-base-600',
        )}
        placeholder='Your message ...'
        required
      />

      <button
        disabled={!isValid || isLoading}
        className={tw(
          'flex max-w-max items-center ml-auto',
          'h-8 px-4 text-sm font-medium rounded mt-2',
          'bg-primary-600 text-white',
          (isValid || isLoading) && 'hover:bg-primary-700 active:bg-primary-800',
          (!isValid || isLoading) && 'opacity-75 cursor-not-allowed',
        )}
      >
        {isLoading && <Loader2Icon size='0.65rem' className='animate-spin mr-2' />}
        {isLoading && <span>Sending ...</span>}
        {!isLoading && 'Send'}
      </button>
    </form>
  )
}
