import type { HobbyCardProps } from '@/types/customType'

import Icon from '../atoms/Icon'

import clsx from 'clsx'

const HobbyCard = ({ icon, title }: HobbyCardProps) => {
  return (
    <li className={clsx('flex items-center space-x-2 p-2 md:p-4', 'min-h-[4rem] rounded border', 'border-color')}>
      <Icon className='text-[1.25em] md:text-[1.5em] text-primary-500 dark:text-primary-400' type={icon} />
      <p className='text-typo-600 dark:text-typo-400 text-xs sm:text-sm md:text-base'>{title}</p>
    </li>
  )
}

export default HobbyCard
