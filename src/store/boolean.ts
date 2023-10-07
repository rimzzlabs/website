import type { PrimitiveAtom } from 'jotai'
import { atom } from 'jotai'

export function booleanAtomWithHandler(initialValue: boolean) {
  const value = atom(initialValue)
  const enable = atom(null, (_, set) => set(value, true))
  const disable = atom(null, (_, set) => set(value, false))
  const toggle = atom(null, (get, set) => set(value, !get(value)))

  return { value, enable, disable, toggle }
}

export function toggleAtom(anAtom: PrimitiveAtom<boolean>) {
  return atom(null, (get, set) => set(anAtom, !get(anAtom)))
}
export function enableAtom(anAtom: PrimitiveAtom<boolean>) {
  return atom(null, (_, set) => set(anAtom, true))
}
export function disableAtom(anAtom: PrimitiveAtom<boolean>) {
  return atom(null, (get, set) => set(anAtom, false))
}
