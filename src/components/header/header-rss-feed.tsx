import { tw } from '@/utils/common'

import { RssIcon } from 'lucide-react'
import Link from 'next/link'

export function HeaderRssFeed() {
  return (
    <Link
      href='/feed'
      target='_blank'
      rel='noopener'
      className={tw(
        'inline-flex items-center justify-center',
        'w-8 h-8 rounded flex-shrink-0',
        'motion-safe:transition dark:bg-base-900',
        'hover:bg-base-100 active:bg-base-200',
        'dark:hover:bg-base-800 dark:active:bg-base-950',
      )}
    >
      <RssIcon size={16} className='dark:text-base-50' />
      <span className='sr-only'>See RSS Feed</span>
    </Link>
  )
}
