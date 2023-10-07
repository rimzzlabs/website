'use client'

import { tw } from '@/utils/common'

import { drawerConfirmationAtom } from '@/store/drawer'

import { BaseDrawer } from './base-drawer'

import { useAtom } from 'jotai'
import { useState } from 'react'
import { P, match } from 'ts-pattern'

export function DrawerConfirmation() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [drawerConfirmation, setDrawerConfirmation] = useAtom(drawerConfirmationAtom)
  const onClose = () => setDrawerConfirmation((prev) => ({ ...prev, open: false }))

  const confirmButtonText = match(drawerConfirmation?.text?.yes)
    .with(P.nullish, () => 'Confirm')
    .otherwise((text) => text)
  const cancelButtonText = match(drawerConfirmation?.text?.no)
    .with(P.nullish, () => 'Cancel')
    .otherwise((text) => text)

  const onConfirm = async () => {
    setIsDisabled(true)
    try {
      await drawerConfirmation?.onConfirm?.()
    } catch (err) {
      console.info(err)
    } finally {
      setIsDisabled(false)
      onClose()
    }
  }

  return (
    <BaseDrawer
      dismissible={!isDisabled}
      className='max-h-[50%]'
      onClose={onClose}
      open={drawerConfirmation.open}
    >
      <p className='font-bold text-lg px-4'>{drawerConfirmation.title}</p>
      <div className='px-4 pt-4'>
        <p>{drawerConfirmation.body}</p>

        <div className='grid grid-cols-2 gap-2 pt-4'>
          <button
            onClick={onConfirm}
            disabled={isDisabled}
            className={tw(
              'px-2 py-2.5',
              'text-sm font-medium',
              'rounded-md motion-safe:transition',
              'bg-base-700 text-white',
              !isDisabled && 'hover:bg-base-900 active:bg-base-950',
              isDisabled && 'opacity-60 cursor-not-allowed',
            )}
          >
            {confirmButtonText}
          </button>
          <button
            disabled={isDisabled}
            onClick={onClose}
            className={tw(
              'px-2 py-2.5',
              'text-sm font-medium',
              'rounded-md motion-safe:transition',
              'bg-primary-600 text-white',
              !isDisabled && 'hover:bg-primary-700 active:bg-primary-800',
              isDisabled && 'opacity-60 cursor-not-allowed',
            )}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </BaseDrawer>
  )
}
