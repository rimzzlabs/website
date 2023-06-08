'use client'

import { useTheme } from '@/hooks/useTheme'

import { tw } from '@/utils/tw'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CgSpinner } from 'react-icons/cg'
import {
  HiCheck,
  HiDesktopComputer,
  HiOutlineMoon as Moon,
  HiOutlineSun as Sun,
} from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'

type ThemeMenu = { value: string; name: string; icon: IconType }

const menu: ThemeMenu[] = [
  { name: 'System', icon: HiDesktopComputer, value: 'system' },
  { name: 'Dark', icon: Moon, value: 'dark' },
  { name: 'Light', icon: Sun, value: 'light' },
]

export const HeaderThemeSelector = () => {
  const { theme, systemTheme, changeTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <button
        title='Switch theme'
        className={tw(
          'inline-flex items-center justify-center',
          'flex-shrink-0',
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-theme-50 dark:bg-base-900',
        )}
      >
        <CgSpinner className='animate-spin' />
        <span className='sr-only'>Switch theme</span>
      </button>
    )
  }

  return (
    <Menu as='div' className='relative z-40'>
      <Menu.Button
        title='Theme menu button'
        className={tw(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded flex-shrink-0 transition',
          'bg-base-50 dark:bg-base-900',
          'hover:bg-base-100 dark:hover:bg-base-800',
        )}
      >
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <Moon className={tw('w-4 h-4 md:w-5 md:h-5', 'text-base-50')} />
        )}
        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <Sun className={tw('w-4 h-4 md:w-5 md:h-5', 'text-base-950')} />
        )}
        <span className='sr-only'>Click to see option to switch theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-300'
        enterFrom='transform opacity-0 scale-95 -translate-y-8'
        enterTo='transform opacity-100 scale-100 -translate-y-0'
        leave='transition ease-in duration-200'
        leaveFrom='transform opacity-100 scale-100 -translate-y-0'
        leaveTo='transform opacity-0 scale-95 -translate-y-2'
      >
        <Menu.Items
          as='div'
          className={tw(
            'absolute top-11 md:top-12',
            'w-40 right-0 p-1 z-[9999]',
            'rounded-md origin-top-right shadow-lg',
            'ring-1 focus:outline-none',
            'ring-black/5 bg-white',
            'dark:shadow-none dark:bg-base-800',
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
                        'rounded transition dark:text-white',
                        active && 'bg-primary-500 text-white',
                      )}
                    >
                      <item.icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className='text-xs md:text-sm'>{item.name}</span>
                      {theme === item.value && <HiCheck className='w-3 h-3' />}
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
