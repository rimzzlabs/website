import { twclsx } from '@/libs/twclsx'

import { memo } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

interface SearchbarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Searchbar: React.FunctionComponent<SearchbarProps> = ({ onChange, value }) => {
  return (
    <div
      className={twclsx(
        'w-full my-8 md:my-16 transition-all',
        'bg-transparent border border-theme-900',
        'dark:border-transparent dark:bg-theme-800',
        'focus-within:ring-1 ring-theme-900 dark:ring-primary-400'
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
            'w-full h-12 text-sm md:text-base',
            'bg-transparent outline-none caret-black dark:caret-primary-400',
            'placeholder:text-theme-800'
          )}
        />
      </div>
    </div>
  )
}

export default memo(Searchbar)
