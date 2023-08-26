import { tw } from '@/utils/common'

import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { match } from 'ts-pattern'

export const LogoutButton = () => {
  const session = useSession()

  return match(session)
    .with({ status: 'authenticated' }, () => {
      const handler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await signOut()
      }
      return (
        <button
          onClick={handler}
          className={tw(
            'inline-flex items-center justify-center ml-auto',
            'w-8 h-8 rounded flex-shrink-0',
            'motion-safe:transition dark:bg-base-900',
            'hover:bg-base-100 active:bg-base-200',
            'dark:hover:bg-base-800 dark:active:bg-base-950',
          )}
        >
          <LogOutIcon size={16} className='text-base-900 dark:text-base-50' />
          <span className='sr-only'>Logout</span>
        </button>
      )
    })
    .otherwise(() => null)
}
