import { CustomLink } from '@/components/custom-link'

import { NAVBAR_ROUTES } from '@/domains/routes'

import { tw } from '@/utils/tw'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { TbAddressBook, TbFilePencil, TbHome, TbMenu, TbSwipe, TbX } from 'react-icons/tb'
import { match } from 'ts-pattern'

export const NavbarMobile = () => {
  const getIcon = (type: string) => {
    return match(type)
      .with('/', () => TbHome)
      .with('/blog', () => TbFilePencil)
      .with('/project', () => TbSwipe)
      .with('/guestbook', () => TbAddressBook)
      .otherwise(() => Fragment)
  }

  const routes = NAVBAR_ROUTES.map((route) => ({ ...route, Icon: getIcon(route.href) }))

  return (
    <Menu as='div' className='md:hidden relative z-40'>
      <Menu.Button
        title='Menu List'
        className={tw(
          'inline-flex items-center justify-center',
          'w-8 h-8 rounded flex-shrink-0',
          'motion-safe:transition dark:bg-base-900',
          'hover:bg-base-100 active:bg-base-200',
          'dark:hover:bg-base-800 dark:active:bg-base-950',
        )}
      >
        {({ open }) => (
          <>
            {open ? (
              <TbX size={16} className='text-base-900 dark:text-base-50' />
            ) : (
              <TbMenu size={16} className='text-base-900 dark:text-base-50' />
            )}
            <span className='sr-only'>Click to open menus</span>
          </>
        )}
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
            'w-32 p-0.5 z-[9999]',
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
                        'px-1.5 h-8 w-full',
                        'rounded motion-safe:transition dark:text-white',
                        active && 'bg-base-200 dark:bg-base-900 dark:text-white',
                      )}
                    >
                      <item.Icon size={16} />
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
