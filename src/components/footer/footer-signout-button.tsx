import { useAuth } from '@/hooks/use-auth'

import { tw } from '@/utils/common'

import { BaseDialog } from '../dialog/base'

import { Loader2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export function FooterSignoutButton() {
  const isAuthenticated = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => {
    if (isLoading) return
    setModalOpen(false)
  }

  const onSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      closeModal()
    }
  }

  if (!isAuthenticated) return null

  return (
    <>
      <BaseDialog
        description='You sure you wanna sign out?'
        title='Sign out confirmation'
        onClose={closeModal}
        open={modalOpen}
        body={
          <div className='flex justify-end'>
            <button
              disabled={isLoading}
              onClick={closeModal}
              className={tw(
                'inline-flex items-center justify-center',
                'h-8 px-4 text-sm font-medium rounded ml-2 order-2',
                'bg-primary-600 text-white',
                'hover:bg-primary-700 active:bg-primary-800',
              )}
            >
              Nah, nevermind
            </button>
            <button
              disabled={isLoading}
              onClick={onSignOut}
              className={tw(
                'inline-flex items-center justify-center',
                'h-8 px-4 text-sm font-medium rounded order-1',
                'bg-red-600 text-white',
                'hover:bg-red-700 active:bg-red-800',
              )}
            >
              {isLoading && <Loader2Icon size='0.875rem' className='mr-1.5 animate-spin' />}
              {isLoading ? 'Signing you out...' : 'Yes, sign me out'}
            </button>
          </div>
        }
      />
      <button
        onClick={openModal}
        className='font-medium md:max-w-max motion-safe:transition text-base-700 dark:text-base-300 hover:text-primary-500 dark:hover:text-primary-500'
      >
        Sign Out
      </button>
    </>
  )
}
