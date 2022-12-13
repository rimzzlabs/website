import { UnstyledButton } from '@/UI/buttons'

import { twclsx } from '@/libs'

import { useGuestbook, useGuestbookUser } from '@/hooks'

import { HiOutlineInformationCircle } from 'react-icons/hi'
import { SiGithub, SiGoogle } from 'react-icons/si'

export const GuestbookEditor: React.FunctionComponent = () => {
  const { user, signin } = useGuestbookUser()
  const { handleSubmit, message, handleChange } = useGuestbook()

  return (
    <section>
      <h2 className='mb-3 md:mb-5'>Sign the Guestbook</h2>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className={twclsx(
            'flex items-center transition rounded',
            'border border-theme-400 dark:border-theme-700',
            'focus-within:border-theme-500 dark:focus-within:border-theme-600'
          )}
        >
          <input
            onChange={handleChange}
            value={message}
            type='text'
            placeholder='Write your message...'
            className={twclsx(
              'w-full h-9 md:h-10 text-sm md:text-base px-3',
              'placeholder:text-sm rounded-l',
              'bg-transparent outline-none caret-black dark:caret-primary-400',
              'placeholder:text-theme-800 placeholder:dark:text-theme-200'
            )}
          />
          <UnstyledButton
            type='submit'
            className={twclsx(
              'h-9 md:h-10 w-24 px-2.5',
              'font-semibold rounded-r transition',
              'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700',
              'dark:bg-theme-700 dark:hover:bg-theme-600'
            )}
          >
            Sign
          </UnstyledButton>
        </form>
      ) : (
        <div className='mb-1'>
          <p className='mb-2.5'>To write message, first sign in with:</p>
          <div className='flex items-center space-x-3'>
            <UnstyledButton
              onClick={signin('github')}
              type='button'
              className={twclsx(
                'h-9 px-2.5 md:px-3 font-medium rounded-md',
                'space-x-2 transition hover:bg-theme-700 dark:hover:bg-theme-700',
                'text-white bg-black dark:bg-theme-800'
              )}
            >
              <SiGithub />
              <span>GitHub</span>
            </UnstyledButton>
            <span className='text-sm'>or</span>
            <UnstyledButton
              onClick={signin('google')}
              type='button'
              className={twclsx(
                'h-9 px-2.5 md:px-3 font-medium rounded-md',
                'space-x-2 transition',
                'text-white bg-primary-600 dark:bg-primary-800',
                'hover:bg-primary-400 dark:hover:bg-primary-700'
              )}
            >
              <SiGoogle />
              <span>Google</span>
            </UnstyledButton>
          </div>
        </div>
      )}
      <div className='flex items-center text-xs md:text-sm mt-3 dark:text-theme-400'>
        <HiOutlineInformationCircle className='w-4 h-4 mr-1.5' />
        <p>
          <em>Your information is only used to display your name</em>
        </p>
      </div>
    </section>
  )
}
