import type { PostTag as TypePostTag } from '@/domains/post'
import { getPostTag } from '@/domains/post'

import { tw } from '@/utils/tw'

import Link from 'next/link'
import { TbAlertCircle } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type Props = {
  tag: TypePostTag
}

export const PostTag = (props: Props) => {
  const tag = getPostTag(props.tag)

  const baseCn =
    'inline-flex items-center space-x-1 py-1 px-2 rounded text-sm border border-base-200 dark:border-base-800'

  return match(tag)
    .with(P.not(P.nullish), (tag) => (
      <Link
        href={{
          pathname: '/tags/',
          query: {
            tag: tag.name,
          },
        }}
        className={tw(baseCn, 'bg-base-100 dark:bg-base-900')}
      >
        <tag.icon size={20} className={tag.color} />
        <span>{tag.name}</span>
      </Link>
    ))
    .otherwise(() => (
      <button className={tw(baseCn, 'text-orange-700 bg-base-100 dark:bg-base-900')}>
        <TbAlertCircle />
        <span className='italic'>Tag might haven&apos;t registered yet</span>
      </button>
    ))
}
