'use client'

import { useTheme } from '@/hooks/use-theme'

import { tw } from '@/utils/tw'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CgSpinner } from 'react-icons/cg'
import type { IconType } from 'react-icons/lib'
import {
  TbMoonStars as Moon,
  TbSunHigh as Sun,
  TbCircleFilled,
  TbDeviceDesktop,
} from 'react-icons/tb'

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
    <Menu as='div' className='relative z-40'>
      <Menu.Button
        className={tw(
          'inline-flex items-center justify-center',
          'w-8 h-8 rounded flex-shrink-0',
          'motion-safe:transition dark:bg-base-900',
          'hover:bg-base-100 active:bg-base-200',
          'dark:hover:bg-base-800 dark:active:bg-base-950',
        )}
      >
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <Moon size={16} className='text-base-50' />
        )}
        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <Sun size={16} className='text-base-900' />
        )}
        <span className='sr-only'>Switch theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='motion-safe:transition ease-out duration-300'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='motion-safe:transition ease-in duration-200'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          as='div'
          className={tw(
            'absolute top-9 right-0',
            'w-40 p-0.5 z-[9999]',
            'ring-1 focus:outline-none border',
            'rounded-md origin-top-right',
            'border-base-300 dark:border-base-700',
            'ring-black/5 bg-white dark:bg-base-800',
          )}
        >
          <ul className='flex flex-col w-full'>
            {menu.map((item) => {
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
                        <TbCircleFilled
                          size={10}
                          className='text-emerald-500 dark:text-emerald-400'
                        />
                      )}
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
