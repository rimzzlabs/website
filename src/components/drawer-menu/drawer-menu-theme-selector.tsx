import { useTheme } from '@/hooks/use-theme'

import { tw } from '@/utils/common'

import { MonitorIcon, MoonStarIcon, SunMediumIcon } from 'lucide-react'

const menu = [
  { name: 'Dark', icon: MoonStarIcon, value: 'dark' },
  { name: 'Light', icon: SunMediumIcon, value: 'light' },
  { name: 'System', icon: MonitorIcon, value: 'system' },
]

function isMenuActive(theme?: string, btnTheme?: string) {
  return btnTheme === theme
}

export function DrawerMenuThemeSelector() {
  const { changeTheme, mounted, theme } = useTheme()

  return (
    <div className='pt-6'>
      <p className='text-lg font-bold pb-4 px-4'>Theme Preference</p>

      <div className='grid grid-cols-3 gap-2 px-1 py-2 bg-base-100 dark:bg-base-900'>
        {menu.map((item) => (
          <button
            onClick={changeTheme(item.value)}
            disabled={!mounted}
            className={tw(
              'flex items-center',
              'py-3 px-4 gap-2.5',
              'rounded-md border motion-safe:transition',
              'bg-white dark:bg-base-800 dark:border-base-800',
              isMenuActive(theme, item.value) && 'bg-primary-600 text-white dark:bg-primary-700',
            )}
            key={item.value}
          >
            {<item.icon size={16} />}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}
