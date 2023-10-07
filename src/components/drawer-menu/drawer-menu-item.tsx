'use client'

import { tw } from '@/utils/common'

import type { ROUTE } from '@/constants/route'
import { drawerMenuAtom } from '@/store/drawer'

import { CustomLink } from '../custom-link'

import { useSetAtom } from 'jotai'
import { BookCopyIcon, FileQuestion, HomeIcon, PenSquareIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { P, match } from 'ts-pattern'

function getIcon(url: string) {
  return match(url)
    .with('/', () => HomeIcon)
    .with('/blog', () => PenSquareIcon)
    .with('/guestbook', () => BookCopyIcon)
    .otherwise(() => FileQuestion)
}

export function DrawerMenuItem(props: ROUTE) {
  const pathname = usePathname()
  const closeDrawer = useSetAtom(drawerMenuAtom.disable)

  const isActive = match(pathname)
    .with(
      P.when((path) => props.href === '/' && path === props.href),
      () => true,
    )
    .with(
      P.when((path) => props.href !== '/' && path.includes(props.href)),
      () => true,
    )
    .otherwise(() => false)

  const Icon = getIcon(props.href)

  return (
    <CustomLink
      onClick={closeDrawer}
      href={props.href}
      title={props.title}
      variant='base'
      className={tw(
        'relative',
        'flex items-center gap-1.5',
        'text-base py-2.5 px-4',
        'motion-safe:transition border-l-4 border-l-transparent',
        'hover:bg-base-200 dark:hover:bg-base-900',
        'active:bg-base-300 dark:active:bg-base-950',
        isActive && 'border-l-primary-500',
      )}
    >
      <Icon size={16} />
      {props.name}
    </CustomLink>
  )
}
