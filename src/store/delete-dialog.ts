import { atom } from 'jotai'

type TDeleteDialogAtom = {
  open: boolean
  title: string
  description: string
  onConfirm(): Promise<void>
}
export const deleteDialogAtom = atom<TDeleteDialogAtom>({
  open: false,
  title: '',
  description: '',
  onConfirm: async () => {
    return
  },
})

export const closeDeleteDialogAtom = atom(null, (get, set) => {
  const prevState = get(deleteDialogAtom)
  set(deleteDialogAtom, { ...prevState, open: false })
})
