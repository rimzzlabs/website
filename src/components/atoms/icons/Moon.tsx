import clsx from 'clsx'

interface MoonProps {
  className?: string
}

const Moon: React.FC<MoonProps> = ({ className }) => (
  <svg
    className={clsx('w-4 md:w-5 h-4 md:h-5', className)}
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
)

export default Moon
