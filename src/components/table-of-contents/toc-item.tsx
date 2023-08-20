'use client'

import { useSpyToc } from '@/hooks/use-spy-toc'

import { tw } from '@/utils/tw'

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
          'text-base-400 dark:text-base-500',
          'hover:text-base-700 dark:hover:text-base-300',
          isActive && 'text-base-700 dark:text-base-300',
        )}
        href={`#${props.url}`}
        style={{ marginLeft }}
      >
        {props.text}

        {isActive && (
          <motion.div
            className='absolute inset-x-0 h-0.5 bottom-0 bg-base-600 dark:text-base-300'
            layoutId='toc'
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
            }}
          />
        )}
      </a>
    </li>
  )
}
