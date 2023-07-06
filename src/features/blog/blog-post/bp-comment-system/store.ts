import { atom } from 'jotai'

export type Comment = {
  text: string
  from: string
  date: string
}

export const AtomComments = atom<Array<Comment>>([])
