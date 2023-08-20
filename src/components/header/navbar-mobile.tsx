'use client'

import { ComboboxMenu } from '@/components/combobox-menu'
import { CustomLink } from '@/components/custom-link'

import { tw } from '@/utils/tw'

import { NAVBAR_ROUTES } from '@/constants/route'

import {
  HomeIcon,
  XIcon,
  MenuIcon,
  FileEditIcon,
  EggFriedIcon,
  BookOpenCheckIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import { match } from 'ts-pattern'

export const NavbarMobile = () => {
  const getIcon = (type: string) => {
    return match(type)
      .with('/', () => HomeIcon)
      .with('/blog', () => FileEditIcon)
      .with('/project', () => EggFriedIcon)
      .with('/guestbook', () => BookOpenCheckIcon)
      .otherwise(() => Fragment)
  }

  const routes = NAVBAR_ROUTES.map((route) => ({ ...route, Icon: getIcon(route.href) }))

  return (
    <ComboboxMenu
      className='md:hidden'
      buttonTitle='App menu'
      renderIcon={(prop) =>
        match(prop.open)
          .with(false, () => <MenuIcon size={16} />)
          .with(true, () => <XIcon size={16} />)
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
