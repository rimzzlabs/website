'use client'

import { tw } from '@/utils/common'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from 'lucide-react'
import { Fragment } from 'react'

export type TBaseDialogProps = {
  title: string
  description: string
  open: boolean
  body?: ((p: TBaseDialogProps) => React.ReactNode) | React.ReactNode
  onClose: () => void
}
export const BaseDialog = (props: TBaseDialogProps) => {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as='div' className='relative z-[99999]' onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40 dark:bg-black/80' />
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
              <Dialog.Panel className='w-11/12 max-w-lg p-4 rounded-lg bg-white dark:bg-base-800'>
                <h4>{props.title}</h4>

                <p className='text-sm mt-2 mb-4 max-w-prose'>{props.description}</p>

                <button
                  onClick={props.onClose}
                  className={tw(
                    'absolute top-4 right-4',
                    'w-7 h-7 rounded border',
                    'inline-flex items-center justify-center',
                    'dark:border-base-800 hover:bg-base-50 dark:hover:bg-base-800',
                  )}
                >
                  <XIcon size='0.875rem' />
                </button>

                {typeof props.body === 'function' ? props.body(props) : props.body}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
