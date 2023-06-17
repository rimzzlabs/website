import { NAVBAR_ROUTES } from '@/data/routes'
import { tw } from '@/utils/tw'

import { UnstyledLink } from '../link/unstyled'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IconType } from 'react-icons'
import {
  HiOutlineBeaker,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineMenuAlt4,
  HiOutlinePencilAlt,
} from 'react-icons/hi'

const IconRoutes = {
  '/': HiOutlineHome,
  '/portfolio': HiOutlineBeaker,
  '/blog': HiOutlinePencilAlt,
  '/me': HiOutlineIdentification,
} as Record<string, IconType>

export const NavbarMobile = () => {
  const routes = NAVBAR_ROUTES.map((route) => ({ ...route, Icon: IconRoutes[route.href] }), [])

  return (
    <Menu as='div' className='md:hidden relative z-40'>
      <Menu.Button
        title='Menu List'
        className={tw(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded flex-shrink-0 transition',
          'bg-base-50 dark:bg-base-900',
          'hover:bg-base-100 dark:hover:bg-base-800',
        )}
      >
        <HiOutlineMenuAlt4 />
        <span className='sr-only'>Menu</span>
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
            {routes.map((item) => {
              return (
                <Menu.Item as='li' key={item.href}>
                  {({ active, close }) => (
                    <UnstyledLink
                      href={item.href}
                      title={item.title}
                      onClick={close}
                      className={tw(
                        'flex items-center justify-start',
                        'px-1.5 h-9 md:h-10 space-x-2.5 w-full',
                        'rounded transition dark:text-white',
                        active && 'bg-primary-500 text-white',
                      )}
                    >
                      <item.Icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className='text-xs md:text-sm'>{item.name}</span>
                    </UnstyledLink>
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
