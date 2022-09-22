import useClickOutside from '@/hooks/useClickOutside'
import { twclsx } from '@/libs/twclsx'

import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import React, { useCallback, useMemo, useRef } from 'react'
import { HiDesktopComputer, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

type ThemeMenuProps = {
  theme: string
  onClose: () => void
  changeTheme: (theme: string) => () => void
}

const ThemeMenu: React.FunctionComponent<ThemeMenuProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useClickOutside(ref, props.onClose)
  const v = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      enter: { opacity: 1 },
      exit: { opacity: 0, translateY: '1rem' }
    }),
    []
  )

  const themesList = useMemo(
    () => [
      { name: 'Light', value: 'light', Icon: HiOutlineSun },
      { name: 'Dark', value: 'dark', Icon: HiOutlineMoon },
      { name: 'System', value: 'system', Icon: HiDesktopComputer }
    ],
    []
  )

  const activeDecsendant = useMemo(() => {
    return themesList.findIndex((f) => f.value === props.theme)
  }, [props.theme, themesList])

  const handleKeyDown = useCallback(
    (theme: string) => (e: React.KeyboardEvent<HTMLLIElement>) => {
      switch (e.key) {
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          e.preventDefault()
          props.changeTheme(theme)
          props.onClose()
          break
        default:
          break
      }
    },
    [props]
  )

  return (
    <m.div
      ref={ref}
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={v}
      className={twclsx(
        'absolute',
        'right-0 -left-28 md:-left-28 top-16',
        'shadow-md dark:shadow-none rounded-lg',
        'bg-theme-50 dark:bg-theme-800'
      )}
    >
      <div
        className={twclsx(
          'relative',
          'before:absolute before:right-0 before:-top-[1.745rem]',
          'before:border-t-[1rem] before:border-b-[1rem] before:border-l-[1rem] before:border-r-[1rem]',
          'before:border-b-theme-100 before:border-r-transparent before:border-l-transparent before:border-t-transparent',
          'dark:before:border-b-theme-800 before:z-[-1]'
        )}
      >
        <ul
          role='listbox'
          aria-activedescendant={themesList[activeDecsendant].value}
          tabIndex={-1}
          className='flex flex-col rounded-lg overflow-hidden'
        >
          {themesList.map((theme) => (
            <li
              onKeyDown={handleKeyDown(theme.value)}
              role='option'
              aria-selected={theme.value === props.theme}
              tabIndex={0}
              className={twclsx(
                'inline-flex items-center w-full cursor-default',
                'h-9 md:h-10 px-2.5 transition text-sm md:text-base font-semibold',
                'hover:bg-theme-100 dark:hover:bg-theme-700',
                'text-theme-700 dark:text-theme-200',
                props.theme === theme.value && 'text-primary-700 dark:text-primary-500'
              )}
              key={theme.value}
              onClick={props.changeTheme(theme.value)}
            >
              <theme.Icon className='mr-2.5' />
              <span>{theme.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  )
}

export default ThemeMenu
