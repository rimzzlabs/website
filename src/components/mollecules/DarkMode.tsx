import useTheme from '@/hooks/useTheme'

import Button from '../atoms/Button'

import clsx from 'clsx'
import { HiMoon, HiSun } from 'react-icons/hi'

const DarkMode: React.FC = () => {
  const { theme, mounted, changeTheme } = useTheme()

  if (mounted && theme == 'dark') return null

  return (
    <Button
      className={clsx(
        'h-10',
        'aspect-square rounded',
        'bg-primary-100 text-primary-900',
        'dark:bg-theme-900 dark:text-primary-400'
      )}
      onClick={changeTheme}
    >
      {theme === 'light' ? <HiMoon /> : <HiSun />}
    </Button>
  )
}

export default DarkMode
