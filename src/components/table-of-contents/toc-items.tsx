'use client'

import type { TocList } from './toc'
import { TocItem } from './toc-item'

import { LayoutGroup } from 'framer-motion'

export const TocItems = (props: { list: TocList }) => {
  const minLevel = props.list.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0

  return (
    <LayoutGroup>
      <ul className='flex flex-col mt-4 space-y-2 text-sm'>
        {props.list.map((toc, i) => {
          return (
            <TocItem
              {...toc}
              index={i}
              minLevel={minLevel}
              key={`toc-${toc.url}-${toc.level}-index-${i}`}
            />
          )
        })}
      </ul>
    </LayoutGroup>
  )
}
