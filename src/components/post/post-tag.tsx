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

  const className = tw([
    'inline-flex items-center',
    'space-x-1 py-1 px-2 motion-safe:transition',
    'rounded text-sm select-none border',
    'border-base-200 dark:border-base-700',
    'bg-base-100 dark:bg-base-800',
    'hover:bg-base-200 active:bg-base-300',
    'dark:hover:bg-base-700 dark:hover:border-base-600',
    'dark:active:bg-base-900 dark:active:border-base-700',
  ])

  return match([tag, props.clickable])
    .with([P.not(P.nullish), P.nullish], ([tag]) => (
      <Link
        href={{
          pathname: '/tag',
          query: {
            tag: tag.name,
          },
        }}
        className={className}
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
        className={className}
      >
        <tag.icon size={20} className={tag.color} />
        <span>{tag.name}</span>
      </Link>
    ))
    .with([P.not(P.nullish), P.shape(false)], ([tag]) => (
      <span className={tw(className, 'cursor-default')}>
        <tag.icon size={20} className={tag.color} />
        <span>{tag.name}</span>
      </span>
    ))
    .otherwise(() => (
      <button className={className}>
        <TbAlertCircle />
        <span className='italic'>Unknown Tag</span>
      </button>
    ))
}
