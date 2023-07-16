'use client'

import { useSpyToc } from '@/hooks/use-spy-toc'

import { tw } from '@/utils/tw'

type Props = {
  url: string
  text: string
  level: number
  index: number
  minLevel: number
}

export const TocItem = (props: Props) => {
  const activeId = useSpyToc()

  return (
    <li>
      <a
        title={`table of content ${props.text}`}
        className={tw(
          'block w-full font-medium max-w-max',
          'text-base-400 dark:text-base-500',
          'hover:text-base-700 dark:hover:text-base-300',
          activeId && activeId === props.url && 'text-base-700 dark:text-base-300',
        )}
        href={`#${props.url}`}
        style={{ marginLeft: `${(props.level - props.minLevel) * 16}px` }}
      >
        {props.text}
      </a>
    </li>
  )
}
