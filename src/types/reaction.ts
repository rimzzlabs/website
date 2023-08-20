import type { LucideIcon } from 'lucide-react'

export type TReactionType = 'love' | 'rocket' | 'star'
export type TReactionItem = {
  icon: LucideIcon
  name: TReactionType
}
export type TReactionCounter = {
  counter: { [K in TReactionType]: number }
  total: number
}
