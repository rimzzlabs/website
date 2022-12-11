import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs'
import APP_ROUTE from '@/libs/constants/route'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'
import { RiContactsBookLine, RiHome6Line, RiPenNibLine, RiReactjsLine } from 'react-icons/ri'

type RouteType = typeof APP_ROUTE[0] & { icon: IconType }

const icon = {
  home: RiHome6Line,
  portfolio: RiReactjsLine,
  blog: RiPenNibLine,
  guestbook: RiContactsBookLine
} as Record<string, IconType>

const route: RouteType[] = APP_ROUTE.map((r) => ({ ...r, icon: icon[r.name.toLowerCase()] }))

export const MobileNav: React.FunctionComponent = () => {
  return (
    <Menu as='div' className='relative z-40 block md:hidden'>
      <Menu.Button
        title='Menu button'
        className={twclsx(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-12 md:h-12 rounded',
          'bg-primary-100 text-primary-700',
          'dark:bg-theme-700 dark:text-white'
        )}
      >
        <span className='sr-only'>Click to open menu</span>
        <HiMenuAlt4 className='w-4 h-4' />
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
            'absolute top-11 md:top-14',
            'w-40 right-0 p-1.5',
            'rounded origin-top-right shadow-lg',
            'ring-1 focus:outline-none',
            'ring-black/5 bg-white',
            'dark:shadow-none dark:bg-theme-700'
          )}
        >
          <div className='flex flex-col w-full'>
            {route.map((route) => {
              return (
                <Menu.Item key={route.path} as={Fragment}>
                  {({ active }) => (
                    <UnstyledLink
                      className={twclsx(
                        'flex items-center px-2.5 h-9 space-x-2.5 rounded',
                        active && 'bg-primary-500 text-white'
                      )}
                      href={route.path}
                    >
                      <route.icon className='w-4 h-4' />
                      <span className='text-sm'>{route.name}</span>
                    </UnstyledLink>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
