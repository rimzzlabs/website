import { UnstyledButton } from '@/UI//buttons'

import { twclsx } from '@/libs'

import { useTheme } from '@/hooks'

import { Spinner } from '../Spinner'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiCheck, HiDesktopComputer, HiOutlineMoon as Moon, HiOutlineSun as Sun } from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'

type ThemeMenu = { value: string; name: string; icon: IconType }

const menu: ThemeMenu[] = [
  { name: 'System', icon: HiDesktopComputer, value: 'system' },
  { name: 'Dark', icon: Moon, value: 'dark' },
  { name: 'Light', icon: Sun, value: 'light' }
]

export const ThemeMenu: React.FunctionComponent = () => {
  const { theme, systemTheme, changeTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <UnstyledButton
        title='Switch theme'
        className={twclsx(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-primary-100 dark:bg-theme-700'
        )}
      >
        <Spinner spinnerSize='xs' containerSize='full' containerStyle='bg-transparent dark:bg-transparent' />
        <span className='sr-only'>Switch theme</span>
      </UnstyledButton>
    )
  }

  return (
    <Menu as='div' className='relative z-40'>
      <Menu.Button
        title='Theme menu button'
        className={twclsx(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-primary-100 dark:bg-theme-700'
        )}
      >
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <Moon className={twclsx('w-4 h-4 md:w-5 md:h-5', 'text-white')} />
        )}
        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <Sun className={twclsx('w-4 h-4 md:w-5 md:h-5', 'text-primary-700')} />
        )}
        <span className='sr-only'>Click to see option to switch theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          as='div'
          className={twclsx(
            'absolute top-11 md:top-12',
            'w-40 right-0 p-1.5',
            'rounded-md origin-top-right shadow-lg',
            'ring-1 focus:outline-none',
            'ring-black/5 bg-white',
            'dark:shadow-none dark:bg-theme-700'
          )}
        >
          <ul className='flex flex-col w-full'>
            {menu.map((item) => {
              return (
                <Menu.Item as='li' key={item.value} onClick={changeTheme(item.value)}>
                  {({ active }) => (
                    <UnstyledButton
                      className={twclsx(
                        'justify-start px-1.5 h-9 md:h-10 space-x-2.5 w-full',
                        'rounded transition dark:text-white',
                        active && 'bg-primary-500 text-white'
                      )}
                    >
                      <item.icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className='text-xs md:text-sm'>{item.name}</span>
                      {theme === item.value && <HiCheck className='w-3 h-3' />}
                    </UnstyledButton>
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
