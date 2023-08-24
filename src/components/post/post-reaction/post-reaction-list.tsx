'use client'

import { Skeleton } from '@/components/skeleton'

import { usePostSlug } from '@/hooks/use-post-slug'

import { getUUID } from '@/utils/random-uuid'

import { useReactions } from '@/queries/reaction'
import type { TReactionItem } from '@/types/reaction'

import { PostReactionListItem } from './post-reaction-list-item'

import { HeartIcon, RocketIcon, SparklesIcon } from 'lucide-react'
import { P, match } from 'ts-pattern'

export type ETReactionItem = TReactionItem & { id: string }
export const RENDER_REACTION_LIST: ETReactionItem[] = [
  { id: getUUID(), icon: HeartIcon, name: 'love' },
  { id: getUUID(), icon: RocketIcon, name: 'rocket' },
  { id: getUUID(), icon: SparklesIcon, name: 'star' },
]

export const PostReactionList = () => {
  const slug = usePostSlug()
  const query = useReactions(slug)

  const count = match(query)
    .with({ status: 'success', data: P.select() }, (data) => {
      const count = Object.values(data.data.counters).reduce((a, b) => a + b, 0)
      return match(count)
        .with(0, () => <p className='font-semibold text-sm'>No reaction</p>)
        .with(1, () => <p className='font-semibold text-sm'>1 reaction</p>)
        .otherwise(() => <p className='font-semibold text-sm'>{count} reactions</p>)
    })
    .with({ status: 'loading' }, () => <Skeleton className='w-44 h-5' />)
    .otherwise(() => <p className='font-semibold text-sm'>-</p>)

  return (
    <div className='flex items-center justify-between space-x-4 mb-6'>
      {count}

      <div className='inline-flex items-center space-x-2'>
        {RENDER_REACTION_LIST.map((item) => (
          <PostReactionListItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
