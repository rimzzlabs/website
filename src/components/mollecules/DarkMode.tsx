import Button from '@/components/atoms/Button'

import useTheme from '@/hooks/useTheme'

import clsx from 'clsx'
import { HiMoon, HiSun } from 'react-icons/hi'

const DarkMode: React.FC = () => {
  const { theme, mounted, changeTheme } = useTheme()

  if (!mounted) return null

  return (
    <Button
      title='change theme'
      className={clsx('accessible relative', 'h-10 w-10 md:text-xl', 'rounded-xl', 'bg-primary-100 dark:bg-theme-800')}
      onClick={changeTheme}
    >
      {theme === 'light' ? <HiMoon className='text-primary-700' /> : <HiSun className='text-yellow-400' />}
      <span className='sr-only'>Switch Theme</span>
    </Button>
  )
}

export default DarkMode
