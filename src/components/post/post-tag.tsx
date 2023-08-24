import { tw } from '@/utils/tw'

import { SiNextdotjs, SiReact } from '@icons-pack/react-simple-icons'
import {
  ActivityIcon,
  AlertCircleIcon,
  FileCodeIcon,
  FlaskConicalIcon,
  GhostIcon,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { P, match } from 'ts-pattern'

type Props = {
  tag: string
  clickable?: boolean
}
type PostTagProps = {
  name: string
  icon: LucideIcon
  color: string
}
const getPostTag = (tag: string) => {
  return match<typeof tag, PostTagProps | null>(tag)
    .with('react.js', (name) => ({
      name,
      icon: SiReact,
      color: 'text-sky-500',
    }))
    .with('next.js', (name) => ({
      name,
      icon: SiNextdotjs,
      color: 'text-base-800 dark:text-white',
    }))
    .with('jotai', (name) => ({
      name,
      icon: GhostIcon,
      color: 'text-zinc-800 dark:text-white',
    }))
    .with('dev experience', (name) => ({
      name,
      icon: FileCodeIcon,
      color: 'text-blue-500',
    }))
    .with('user experience', (name) => ({
      name,
      icon: FlaskConicalIcon,
      color: 'text-fuchsia-400',
    }))
    .with('personal branding', (name) => ({
      name,
      icon: Lightbulb,
      color: 'text-yellow-500',
    }))
    .with('personal growth', (name) => ({
      name,
      icon: ActivityIcon,
      color: 'text-emerald-500',
    }))
    .otherwise(() => null)
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
        <tag.icon size={18} className={tag.color} />
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
        <tag.icon size={18} className={tag.color} />
        <span>{tag.name}</span>
      </Link>
    ))
    .with([P.not(P.nullish), P.shape(false)], ([tag]) => (
      <span className={tw(className, 'cursor-default')}>
        <tag.icon size={18} className={tag.color} />
        <span>{tag.name}</span>
      </span>
    ))
    .otherwise(() => (
      <button className={className}>
        <AlertCircleIcon size={18} className='text-red-500' />
        <span className='italic'>Unknown Tag</span>
      </button>
    ))
}
