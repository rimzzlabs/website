'use client'

import { tw } from '@/utils/tw'

import { useState } from 'react'

const REACTIONS = [
  { id: 1, name: 'nice', content: '👍' },
  { id: 2, name: 'bad', content: '👎' },
  { id: 3, name: 'love', content: '💙' },
  { id: 4, name: 'peek', content: '👀' },
  { id: 5, name: 'rocket', content: '🚀' },
]

export const PostReaction = () => {
  const [reaction, setReaction] = useState<Record<string, number>>({})

  const handleClick = (name: string) => {
    return () => {
      setReaction((prev) => {
        const prevItem = prev[name] || 0

        return {
          ...prev,
          [name]: prevItem + 1,
        }
      })
    }
  }

  return (
    <div className='flex items-center justify-center space-x-1.5'>
      {REACTIONS.map((item) => (
        <button
          key={item.id}
          onClick={handleClick(item.name)}
          data-count={reaction[item.name] || 0}
          className={tw(
            'relative',
            'flex items-center justify-center',
            'w-9 h-9 text-sm rounded-full',
            'border motion-safe:transition',
            [
              'bg-base-100 dark:bg-base-800',
              'border-base-300 dark:border-base-700',
              'motion-safe:hover:bg-base-200 dark:motion-safe:hover:bg-base-700',
              'motion-safe:active:bg-base-300 dark:motion-safe:active:bg-base-800',
            ],
            reaction[item.name] &&
              reaction[item.name] > 0 && [
                `before:absolute before:content-[attr(data-count)]`,
                'before:text-xs/none',
                'before:rounded-full before:py-1 before:px-1.5',
                'before:-top-2 before:-right-1',
                'before:bg-rose-500 before:text-white',
              ],
          )}
        >
          {item.content}
          <span className='sr-only'>Reaction {item.name}</span>
        </button>
      ))}
    </div>
  )
}
