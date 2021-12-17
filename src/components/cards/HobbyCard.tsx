import clsx from 'clsx'
import Icon from '../atoms/Icon'
import type { HobbyCardProps } from '@/types/customType'

const HobbyCard = ({ icon, title }: HobbyCardProps) => {
  return (
    <li
      className={clsx(
        'flex items-center space-x-2 p-2 md:p-4',
        'min-h-[4rem] rounded bg-primary-low dark:bg-dark-800'
      )}>
      <Icon
        className='text-[1.25em] md:text-[1.5em] text-primary-500 dark:text-rose-500'
        type={icon}
      />
      <p className='text-typo-600 dark:text-typo-400'>{title}</p>
    </li>
  )
}

export default HobbyCard