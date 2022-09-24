import { UnstyledButton } from '@/UI/buttons'
import { ThemeMenu } from '@/UI/common'
import { useTheme } from '@/hooks'
import { twclsx } from '@/libs/twclsx'

import { AnimatePresence } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'
import { ImSpinner9 } from 'react-icons/im'

export const ThemeButton: React.FunctionComponent = () => {
  const theme = useTheme()

  if (!theme.mounted) return <ImSpinner9 className='animate-spin' />

  return (
    <div className='relative'>
      <UnstyledButton
        aria-haspopup='listbox'
        aria-expanded={theme.dropdownIsOpen}
        onClick={theme.toggleDropdown}
        title='switch theme'
        className={twclsx('accessible relative', 'h-10 w-10 text-lg', 'rounded-lg', 'bg-primary-100 dark:bg-theme-800')}
      >
        {(theme.theme === 'dark' || (theme.theme === 'system' && theme.systemTheme === 'dark')) && (
          <HiMoon className={twclsx('text-yellow-400', 'pointer-events-none')} />
        )}
        {(theme.theme === 'light' || (theme.theme === 'system' && theme.systemTheme === 'light')) && (
          <HiSun className={twclsx('text-primary-700', 'pointer-events-none')} />
        )}
      </UnstyledButton>

      <AnimatePresence exitBeforeEnter>
        {theme.dropdownIsOpen && (
          <ThemeMenu changeTheme={theme.changeTheme} onClose={theme.closeDropdown} theme={theme.theme as string} />
        )}
      </AnimatePresence>
    </div>
  )
}
