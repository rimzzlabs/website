'use client'

import { NAVBAR_ROUTES } from '@/constants/route'

import { NavbarItem } from './navbar-item'

import { LayoutGroup } from 'framer-motion'

export const Navbar = () => {
  return (
    <LayoutGroup>
      <nav id='navbar-desktop' className='hidden md:flex items-center mr-auto'>
        {NAVBAR_ROUTES.map((item) => {
          return <NavbarItem key={item.href} {...item} />
        })}
      </nav>
    </LayoutGroup>
  )
}
