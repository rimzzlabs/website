'use client'

import { NAVBAR_ROUTES } from '@/constants/route'

import { HeaderNavbarItem } from './header-navbar-item'

import { LayoutGroup } from 'framer-motion'

export const HeaderNavbar = () => {
  return (
    <LayoutGroup id='navbar-desktop'>
      <nav className='hidden md:flex items-center mr-auto'>
        {NAVBAR_ROUTES.map((item) => {
          return <HeaderNavbarItem key={item.href} {...item} />
        })}
      </nav>
    </LayoutGroup>
  )
}
