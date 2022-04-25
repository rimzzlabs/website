import Button from '@/components/atoms/Button'

import useTheme from '@/hooks/useTheme'
import { twclsx } from '@/libs/twclsx'

import { HiMoon, HiSun } from 'react-icons/hi'

const DarkMode: React.FC = () => {
  const { theme, mounted, changeTheme } = useTheme()

  if (!mounted) return null

  return (
    <Button
      title='change theme'
      className={twclsx('accessible relative', 'h-10 w-10 text-lg', 'rounded-lg', 'bg-primary-100 dark:bg-theme-800')}
      onClick={changeTheme}
    >
      {theme === 'light' ? (
        <HiMoon className={twclsx('text-primary-700')} />
      ) : (
        <HiSun className={twclsx('text-yellow-400')} />
      )}
      <span className={twclsx('sr-only')}>Switch Theme</span>
    </Button>
  )
}

export default DarkMode
