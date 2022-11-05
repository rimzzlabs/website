import { UnstyledButton } from '@/UI/buttons'

import { twclsx } from '@/libs'

import { useGuestbook, useGuestbookUser } from '@/hooks'

import { SiGithub, SiGoogle } from 'react-icons/si'

export const GuestbookEditor: React.FunctionComponent = () => {
  const { user, signin } = useGuestbookUser()
  const { handleSubmit, message, handleChange } = useGuestbook()

  return (
    <div
      className={twclsx(
        'relative w-full p-2 md:p-3 my-10',
        'bg-theme-50 dark:bg-theme-900',
        'before:absolute before:z-[-1] before:-inset-0.5',
        'dark:before:bg-gradient-to-br before:transition-all',
        'from-primary-500 to-ternary-500 before:bg-black',
        user && 'before:focus-within:-bottom-2.5 before:focus-within:-right-2.5'
      )}
    >
      <h2 className='mb-1 text-xl md:text-2xl'>Sign the Guestbook</h2>
      <p className='mb-4'>Write a message to me or for future visitor of my website</p>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className={twclsx(
            'flex items-center transition',
            'border border-theme-400 dark:border-theme-700',
            'focus-within:border-primary-600 dark:focus-within:border-primary-700'
          )}
        >
          <input
            required
            type='text'
            placeholder='Write your message'
            value={message}
            onChange={handleChange}
            className={twclsx(
              'w-full h-9 md:h-10 px-2.5 text-sm md:text-base',
              'bg-transparent outline-none caret-black dark:caret-primary-400',
              'placeholder:text-theme-500 placeholder:font-medium'
            )}
          />
          <UnstyledButton type='submit' className='h-9 md:h-10 w-24 bg-black dark:bg-primary-700 text-white'>
            Sign
          </UnstyledButton>
        </form>
      ) : (
        <div className='flex items-center space-x-3'>
          <UnstyledButton
            onClick={signin('github')}
            type='button'
            className={twclsx('h-10 px-4', 'space-x-2 transition hover:bg-theme-800', 'text-white bg-black')}
          >
            <SiGithub />
            <span>Sign in</span>
          </UnstyledButton>

          <UnstyledButton
            onClick={signin('google')}
            type='button'
            className={twclsx(
              'h-10 px-4',
              'space-x-2 transition',
              'text-white bg-primary-600 dark:bg-primary-700',
              'hover:bg-primary-400 dark:hover:bg-primary-500'
            )}
          >
            <SiGoogle />
            <span>Sign in</span>
          </UnstyledButton>
        </div>
      )}
      <p className='text-sm mt-2'>
        <strong>Your information is only used to display your name</strong>
      </p>
    </div>
  )
}
