import { twclsx } from '@/libs/twclsx'

import { memo } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

interface SearchbarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Component: React.FunctionComponent<SearchbarProps> = ({ onChange, value }) => {
  return (
    <div
      className={twclsx(
        'w-full transition rounded',
        'bg-transparent border',
        'border-theme-200 dark:border-theme-700',
        'bg-theme-100 dark:bg-theme-800/50',
        'ring-primary-500 dark:ring-primary-500/50',
        'focus-within:ring-1 focus-within:border-primary-500 dark:focus-within:border-primary-500/50'
      )}
    >
      <div className='flex items-center'>
        <HiOutlineSearch className='w-12' />
        <input
          onChange={onChange}
          value={value}
          type='text'
          placeholder='Search...'
          className={twclsx(
            'w-full h-9 md:h-10 text-sm md:text-base',
            'bg-transparent outline-none caret-black dark:caret-primary-400',
            'placeholder:text-theme-800 placeholder:dark:text-theme-200'
          )}
        />
      </div>
    </div>
  )
}

export const Searchbar = memo(Component)
