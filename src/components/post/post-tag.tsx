import type { PostTag as TypePostTag } from '@/domains/post'
import { getPostTag } from '@/domains/post'

import { tw } from '@/utils/tw'

import Link from 'next/link'
import { TbAlertCircle } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type Props = {
  tag: TypePostTag
  clickable?: boolean
}

export const PostTag = (props: Props) => {
  const tag = getPostTag(props.tag)

  const baseCn =
    'inline-flex items-center space-x-1 py-1 px-2 rounded text-sm select-none border border-base-200 dark:border-base-800'

  return match([tag, props.clickable])
    .with([P.not(P.nullish), P.nullish], ([tag]) => (
      <Link
        href={{
          pathname: '/tag',
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
    .with([P.not(P.nullish), P.shape(true)], ([tag]) => (
      <Link
        href={{
          pathname: '/tag',
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
    .with([P.not(P.nullish), P.shape(false)], ([tag]) => (
      <span className={tw(baseCn, 'cursor-default', 'bg-base-100 dark:bg-base-900')}>
        <tag.icon size={20} className={tag.color} />
        <span>{tag.name}</span>
      </span>
    ))
    .otherwise(() => (
      <button className={tw(baseCn, 'text-orange-700 bg-base-100 dark:bg-base-900')}>
        <TbAlertCircle />
        <span className='italic'>Tag might haven&apos;t registered yet</span>
      </button>
    ))
}
