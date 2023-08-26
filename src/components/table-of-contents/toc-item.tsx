'use client'

import { useSpyToc } from '@/hooks/use-spy-toc'

import { tw } from '@/utils/common'

import { motion } from 'framer-motion'

type Props = {
  url: string
  text: string
  level: number
  index: number
  minLevel: number
}

export const TocItem = (props: Props) => {
  const activeId = useSpyToc()
  const marginLeft = `${(props.level - props.minLevel) * 16}px`
  const isActive = activeId && activeId == props.url

  return (
    <li>
      <a
        title={`table of content ${props.text}`}
        className={tw(
          'relative',
          'block w-full font-medium max-w-max pb-0.5',
          'hover:text-base-700 dark:hover:text-base-300',
          !isActive && 'text-base-400 dark:text-base-500',
          isActive && 'text-base-700 dark:text-base-300',
        )}
        href={`#${props.url}`}
        style={{ marginLeft }}
      >
        {props.text}

        {isActive && (
          <motion.div
            className={tw(
              'absolute inset-x-0 h-px bottom-0 bg-base-400',
              'dark:bg-gradient-to-r dark:from-base-300 dark:bg-unset',
            )}
            layoutId='toc'
            transition={{
              type: 'tween',
              duration: 0.15,
            }}
          />
        )}
      </a>
    </li>
  )
}
