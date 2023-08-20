'use client'

import { getUUID } from '@/utils/random-uuid'
import { tw } from '@/utils/tw'

import type { TReactionItem } from '@/types/reaction'

import { PostReactionItem } from './post-reaction-item'

import { HeartIcon, RocketIcon, ThumbsUpIcon } from 'lucide-react'

export type ETReactionItem = TReactionItem & { id: string }
export const RENDER_REACTION_LIST: ETReactionItem[] = [
  {
    id: getUUID(),
    icon: ThumbsUpIcon,
    name: 'rocket',
  },
  {
    id: getUUID(),
    icon: HeartIcon,
    name: 'love',
  },
  {
    id: getUUID(),
    icon: RocketIcon,
    name: 'rocket',
  },
]

export const PostReaction = (props: { slug: string }) => {
  return (
    <div className='max-w-prose mt-8'>
      <div className={tw('flex items-center justify-end gap-1.5')}>
        {RENDER_REACTION_LIST.map((item) => (
          <PostReactionItem key={item.id} slug={props.slug} {...item} />
        ))}
      </div>
    </div>
  )
}
