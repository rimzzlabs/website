import { IconProps } from '@/components/atoms/Icons/icon.type'

import clsx from 'clsx'

const ChevronDown: React.FunctionComponent<IconProps> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={clsx('h-4 w-4', className)}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
  </svg>
)

export default ChevronDown
