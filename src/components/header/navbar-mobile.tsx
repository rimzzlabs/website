import { CustomLink } from '@/components/custom-link'

import { NAVBAR_ROUTES } from '@/domains/routes'

import { tw } from '@/utils/tw'

import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useCallback, useMemo } from 'react'
import { TbAddressBook, TbFilePencil, TbHome, TbMenu, TbSwipe, TbX } from 'react-icons/tb'
import { match } from 'ts-pattern'

export const NavbarMobile = () => {
  const getIcon = useCallback((type: string) => {
    return match(type)
      .with('/', () => TbHome)
      .with('/blog', () => TbFilePencil)
      .with('/project', () => TbSwipe)
      .with('/guestbook', () => TbAddressBook)
      .otherwise(() => React.Fragment)
  }, [])

  const routes = useMemo(
    () => NAVBAR_ROUTES.map((route) => ({ ...route, Icon: getIcon(route.href) })),
    [getIcon],
  )

  return (
    <Menu as='div' className='md:hidden relative z-40'>
      <Menu.Button
        title='Menu List'
        className={tw(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded flex-shrink-0 motion-safe:transition',
          'bg-base-50 dark:bg-base-900',
          'hover:bg-base-200 dark:hover:bg-base-800',
        )}
      >
        {({ open }) => (
          <>
            {open ? <TbX /> : <TbMenu />}
            <span className='sr-only'>Open to see menu</span>
          </>
        )}
      </Menu.Button>

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
            'absolute top-12 right-0',
            'w-40 p-0.5 z-[9999]',
            'ring-1 focus:outline-none border',
            'rounded-md origin-top-right',
            'border-base-300 dark:border-base-700',
            'ring-black/5 bg-white dark:bg-base-800',
          )}
        >
          <ul className='flex flex-col w-full'>
            {routes.map((item) => {
              return (
                <Menu.Item as='li' key={item.href}>
                  {({ active, close }) => (
                    <CustomLink
                      href={item.href}
                      title={item.title}
                      onClick={close}
                      variant='unstyled'
                      className={tw(
                        'flex items-center',
                        'px-1.5 h-9 md:h-10 w-full',
                        'rounded motion-safe:transition dark:text-white',
                        active && 'bg-base-200 dark:bg-base-900 dark:text-white',
                      )}
                    >
                      <item.Icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className='text-xs md:text-sm ml-2.5 mr-4'>{item.name}</span>
                    </CustomLink>
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
