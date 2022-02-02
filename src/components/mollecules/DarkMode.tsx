import useTheme from '@/hooks/useTheme'

import Button from '../atoms/Button'
import Moon from '../atoms/icons/Moon'
import Sun from '../atoms/icons/Sun'

import clsx from 'clsx'

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
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}

export default DarkMode
