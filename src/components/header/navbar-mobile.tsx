'use client'

import { ComboboxMenu } from '@/components/combobox-menu'
import { CustomLink } from '@/components/custom-link'

import { NAVBAR_ROUTES } from '@/domains/routes'

import { tw } from '@/utils/tw'

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
    <ComboboxMenu
      className='md:hidden'
      buttonTitle='App menu'
      renderIcon={(prop) =>
        match(prop.open)
          .with(false, () => <TbMenu size={16} />)
          .with(true, () => <TbX size={16} />)
          .exhaustive()
      }
      renderItems={(_, Menu) => {
        return routes.map((item) => {
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
        })
      }}
    />
  )
}
