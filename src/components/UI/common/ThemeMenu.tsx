import { useClickOutside } from '@/hooks'
import { twclsx } from '@/libs/twclsx'

import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { HiDesktopComputer, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

type ThemeMenuProps = {
  theme: string
  onClose: () => void
  changeTheme: (theme: string) => () => void
}

export const ThemeMenu: React.FunctionComponent<ThemeMenuProps> = (props) => {
  const animatableRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  useClickOutside(animatableRef, props.onClose)
  const v = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, translateY: 25 },
      enter: { opacity: 1, translateY: 0 },
      exit: { opacity: 0, translateY: 20 }
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
    (theme: string, index: number) => (e: React.KeyboardEvent<HTMLLIElement>) => {
      e.preventDefault()
      const list = document.querySelectorAll("li[role='option']") as NodeListOf<HTMLLIElement>
      const ARROW_UP = 'ArrowUp'
      const ARROW_DOWN = 'ArrowDown'
      const ARROW_LEFT = 'ArrowLeft'
      const ARROW_RIGHT = 'ArrowRight'
      const elArrowDown = list[index + 1]
      const elArrowUp = list[index - 1]

      const changeOpts = {
        ' ': true,
        SpaceBar: true,
        Enter: true
      } as Record<string, boolean>

      if ((e.key === ARROW_DOWN || e.key === ARROW_RIGHT) && elArrowDown) {
        elArrowDown.focus({ preventScroll: true })
      } else if ((e.key === ARROW_DOWN || e.key === ARROW_RIGHT) && !elArrowDown) {
        list[0].focus({ preventScroll: true })
      } else if ((e.key === ARROW_UP || e.key === ARROW_LEFT) && elArrowUp) {
        elArrowUp.focus({ preventScroll: true })
      } else if ((e.key === ARROW_UP || e.key === ARROW_LEFT) && !elArrowUp) {
        list[list.length - 1].focus({ preventScroll: true })
      }

      if (changeOpts[e.key]) {
        props.changeTheme(theme)()
        props.onClose()
      }
    },
    [props]
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (listRef.current) {
        ;(listRef.current.childNodes[0] as HTMLLIElement).focus({ preventScroll: true })
      }
    }
  }, [])

  return (
    <m.div
      ref={animatableRef}
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={v}
      className={twclsx(
        'absolute',
        'right-0 -left-28 md:-left-28 top-14',
        'shadow-md dark:shadow-none rounded-lg',
        'bg-theme-50 dark:bg-theme-800'
      )}
    >
      <ul
        ref={listRef}
        role='listbox'
        aria-activedescendant={themesList[activeDecsendant].value}
        tabIndex={-1}
        className='flex flex-col rounded-lg p-2.5'
      >
        {themesList.map((theme, index) => (
          <li
            onAnimationStart={(e) => console.info(e)}
            onKeyDown={handleKeyDown(theme.value, index)}
            role='option'
            aria-selected={theme.value === props.theme}
            tabIndex={0}
            className={twclsx(
              'inline-flex items-center w-full cursor-default rounded-lg',
              'h-9 md:h-10 px-2.5 transition text-sm md:text-base font-semibold',
              'hover:bg-primary-100 dark:hover:bg-theme-700',
              'text-theme-700 dark:text-theme-200',
              'focus-visible:ring focus-visible:outline-none focus-visible:ring-primary-500',
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
    </m.div>
  )
}
