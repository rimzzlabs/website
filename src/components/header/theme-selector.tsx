'use client'

import { ComboboxMenu } from '@/components/combobox-menu'

import { useTheme } from '@/hooks/use-theme'

import { tw } from '@/utils/common'

import { CircleIcon, Loader2Icon, MonitorIcon, MoonStarIcon, SunMediumIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { match } from 'ts-pattern'

type ThemeMenu = { value: string; name: string; icon: LucideIcon }

const menu: ThemeMenu[] = [
  { name: 'System', icon: MonitorIcon, value: 'system' },
  { name: 'Dark', icon: MoonStarIcon, value: 'dark' },
  { name: 'Light', icon: SunMediumIcon, value: 'light' },
]

export const HeaderThemeSelector = () => {
  const { theme, changeTheme, mounted, actualTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        disabled
        title='Switch theme'
        className={tw(
          'inline-flex items-center justify-center',
          'flex-shrink-0',
          'w-8 h-8 rounded dark:bg-base-900',
        )}
      >
        <Loader2Icon size='1em' className='animate-spin dark:text-white' />
        <span className='sr-only'>Loading theme menu button...</span>
      </button>
    )
  }

  return (
    <ComboboxMenu
      buttonTitle='Switch Theme'
      renderIcon={() => {
        return match(actualTheme)
          .with('dark', () => <MoonStarIcon size={16} className='text-base-50' />)
          .with('light', () => <SunMediumIcon size={16} className='text-base-900' />)
          .otherwise(() => null)
      }}
      renderItems={(_, Menu) => {
        return menu.map((item) => {
          return (
            <Menu.Item
              as='li'
              className='w-full'
              key={item.value}
              onClick={changeTheme(item.value)}
            >
              {({ active }) => (
                <button
                  className={tw(
                    'flex items-center',
                    'px-1.5 h-8 w-full',
                    'rounded motion-safe:transition dark:text-white',
                    active && 'bg-base-200 dark:bg-base-900 dark:text-white',
                  )}
                >
                  <item.icon size={16} />
                  <span className='text-xs md:text-sm ml-2.5 mr-2'>{item.name}</span>
                  {theme === item.value && (
                    <CircleIcon size={10} className='text-emerald-500 dark:text-emerald-400' />
                  )}
                </button>
              )}
            </Menu.Item>
          )
        })
      }}
    />
  )
}
