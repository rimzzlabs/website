'use client'

import { tw } from '@/utils/common'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type RenderPropArg = {
  open: boolean
}

type ComboboxMenuProps = {
  buttonTitle: string
  className?: string
  renderIcon: (prop: RenderPropArg) => React.ReactNode
  renderItems: (prop: RenderPropArg, menu: typeof Menu) => React.ReactNode
}

export const ComboboxMenu = (props: ComboboxMenuProps) => {
  return (
    <Menu as='div' className={tw('relative z-40', props.className)}>
      <Menu.Button
        className={tw(
          'inline-flex items-center justify-center',
          'w-8 h-8 rounded flex-shrink-0',
          'motion-safe:transition dark:bg-base-900',
          'hover:bg-base-100 active:bg-base-200',
          'dark:hover:bg-base-800 dark:active:bg-base-950',
        )}
      >
        {(btnProps) => (
          <>
            {props.renderIcon(btnProps)}
            <span className='sr-only'>{props.buttonTitle}</span>
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
            'w-40 p-0.5 z-[9999]',
            'ring-1 focus:outline-none border',
            'rounded-md origin-top-right',
            'border-base-300 dark:border-base-700',
            'ring-black/5 bg-white dark:bg-base-800',
          )}
        >
          {(menuItemsProps) => (
            <>
              <ul className='flex flex-col w-full'>{props.renderItems(menuItemsProps, Menu)}</ul>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
