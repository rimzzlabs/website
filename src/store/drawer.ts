import { booleanAtomWithHandler } from './boolean'

import { atom } from 'jotai'

export const drawerMenuAtom = booleanAtomWithHandler(false)

type TDrawerConfirmation = {
  open: boolean
  title: string
  body: string
  text?: {
    /**
     * @default  "Confirm"
     */
    yes?: string | null
    /**
     * @default  "Cancel"
     */
    no?: string | null
  }
  onConfirm?: () => Promise<unknown>
}
export const drawerConfirmationAtom = atom<TDrawerConfirmation>({
  open: false,
  title: '',
  body: '',
})

export const drawerSigninAtom = booleanAtomWithHandler(false)
