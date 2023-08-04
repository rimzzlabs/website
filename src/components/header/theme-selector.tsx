'use client'

import { ComboboxMenu } from '@/components/combobox-menu'

import { useTheme } from '@/hooks/use-theme'

import { tw } from '@/utils/tw'

import { CgSpinner } from 'react-icons/cg'
import type { IconType } from 'react-icons/lib'
import {
  TbMoonStars as Moon,
  TbSunHigh as Sun,
  TbCircleFilled,
  TbDeviceDesktop,
} from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type ThemeMenu = { value: string; name: string; icon: IconType }

const menu: ThemeMenu[] = [
  { name: 'System', icon: TbDeviceDesktop, value: 'system' },
  { name: 'Dark', icon: Moon, value: 'dark' },
  { name: 'Light', icon: Sun, value: 'light' },
]

export const HeaderThemeSelector = () => {
  const { theme, systemTheme, changeTheme, mounted } = useTheme()

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
        <CgSpinner className='animate-spin dark:text-white' />
        <span className='sr-only'>Loading theme menu button...</span>
      </button>
    )
  }

  return (
    <ComboboxMenu
      buttonTitle='Switch Theme'
      renderIcon={() => {
        return match([theme, systemTheme])
          .with(P.shape(['dark', P._]).or(P.shape(['system', 'dark'])), () => (
            <Moon size={16} className='text-base-50' />
          ))
          .with(P.shape(['light', P._]).or(P.shape(['system', 'light'])), () => (
            <Sun size={16} className='text-base-900' />
          ))
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
                    <TbCircleFilled size={10} className='text-emerald-500 dark:text-emerald-400' />
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
