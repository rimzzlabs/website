'use client'

import { CustomTooltip } from '@/components/CustomTooltip'

import { useTheme } from '@/hooks/use-theme'

import { tw } from '@/utils/tw'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CgSpinner } from 'react-icons/cg'
import type { IconType } from 'react-icons/lib'
import { TbMoonStars as Moon, TbSunHigh as Sun, TbCheck, TbDeviceDesktop } from 'react-icons/tb'

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
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-theme-50 dark:bg-base-950',
        )}
      >
        <CgSpinner className='animate-spin' />
        <span className='sr-only'>Loading theme menu button...</span>
      </button>
    )
  }

  return (
    <Menu as='div' className='relative z-40'>
      <Menu.Button
        data-tooltip-id='theme-selector-button'
        className={tw(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded flex-shrink-0 motion-safe:transition',
          'bg-base-50 dark:bg-base-950',
          'hover:bg-base-200 dark:hover:bg-base-900',
        )}
      >
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <Moon className={tw('w-4 h-4 md:w-5 md:h-5', 'text-base-50')} />
        )}
        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <Sun className={tw('w-4 h-4 md:w-5 md:h-5', 'text-base-950')} />
        )}
        <span className='sr-only'>Click to switch theme</span>
      </Menu.Button>

      <CustomTooltip place='bottom' id='theme-selector-button' content='Switch theme' />

      <Transition
        as={Fragment}
        enter='motion-safe:transition ease-out duration-300'
        enterFrom='transform opacity-0 scale-95 -translate-y-8'
        enterTo='transform opacity-100 scale-100 -translate-y-0'
        leave='motion-safe:transition ease-in duration-200'
        leaveFrom='transform opacity-100 scale-100 -translate-y-0'
        leaveTo='transform opacity-0 scale-95 -translate-y-2'
      >
        <Menu.Items
          as='div'
          className={tw(
            'absolute top-11 md:top-12',
            'w-40 right-0 p-1 z-[9999]',
            'ring-1 focus:outline-none border',
            'rounded-md origin-top-right',
            'border-base-400 dark:border-base-600',
            'ring-black/5 bg-white dark:bg-base-900',
          )}
        >
          <ul className='flex flex-col w-full'>
            {menu.map((item) => {
              return (
                <Menu.Item as='li' key={item.value} onClick={changeTheme(item.value)}>
                  {({ active }) => (
                    <button
                      className={tw(
                        'flex items-center justify-start',
                        'px-1.5 h-9 md:h-10 space-x-2.5 w-full',
                        'rounded motion-safe:transition dark:text-white',
                        active && 'bg-primary-500 text-white',
                      )}
                    >
                      <item.icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className='text-xs md:text-sm'>{item.name}</span>
                      {theme === item.value && <TbCheck />}
                    </button>
                  )}
                </Menu.Item>
              )
            })}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
