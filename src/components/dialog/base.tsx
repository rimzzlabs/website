'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export type TBaseDialogProps = {
  title: string
  description: string
  open: boolean
  body?: (p: TBaseDialogProps) => React.ReactNode
  onClose: () => void
}
export const BaseDialog = (props: TBaseDialogProps) => {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as='div' className='relative z-[998]' onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/75' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-lg p-4 rounded-lg bg-white dark:bg-base-900'>
                <h4>{props.title}</h4>

                <p className='mt-2 mb-4'>{props.description}</p>

                {props?.body?.(props)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
