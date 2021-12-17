import clsx from 'clsx'
import Icon from '../atoms/Icon'

type HobbiesCardProps = {
  icon: string
  title: string
}

const HobbiesCard = (props: HobbiesCardProps) => {
  return (
    <li
      className={clsx(
        'flex items-center space-x-2 p-2 md:p-4',
        'min-h-[4rem] rounded bg-primary-low dark:bg-dark-800'
      )}>
      <Icon
        className='text-[1.25em] md:text-[1.5em] text-primary-500 dark:text-rose-500'
        type={props.icon}
      />
      <p className='text-typo-600 dark:text-typo-400'>{props.title}</p>
    </li>
  )
}

export default HobbiesCard
