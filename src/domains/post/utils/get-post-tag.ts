import type { PostTag } from '../type'

import type { IconType } from 'react-icons'
import {
  TbActivityHeartbeat,
  TbBrandNextjs,
  TbBrandReact,
  TbFileCode2,
  TbGhost,
  TbNorthStar,
  TbUxCircle,
} from 'react-icons/tb'
import { match } from 'ts-pattern'

type PostTagProps = {
  name: PostTag
  icon: IconType
  color: string
}

export const getPostTag = (tag: PostTag) => {
  return match<typeof tag, PostTagProps | null>(tag)
    .with('react.js', (name) => ({
      name,
      icon: TbBrandReact,
      color: 'text-sky-500',
    }))
    .with('next.js', (name) => ({
      name,
      icon: TbBrandNextjs,
      color: 'text-z-800 dark:text-white',
    }))
    .with('jotai', (name) => ({
      name,
      icon: TbGhost,
      color: 'text-zinc-800 dark:text-white',
    }))
    .with('dev experience', (name) => ({
      name,
      icon: TbFileCode2,
      color: 'text-blue-500',
    }))
    .with('user experience', (name) => ({
      name,
      icon: TbUxCircle,
      color: 'text-fuchsia-400',
    }))
    .with('personal branding', (name) => ({
      name,
      icon: TbNorthStar,
      color: 'text-yellow-500',
    }))
    .with('personal growth', (name) => ({
      name,
      icon: TbActivityHeartbeat,
      color: 'text-emerald-500',
    }))
    .otherwise(() => null)
}
