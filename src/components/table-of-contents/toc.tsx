'use client'

import { TocItem } from './toc-item'

import { useMemo } from 'react'

export type TocList = Array<{ url: string; text: string; level: number }>

type TableOfContentsProps = {
  list: TocList
  slug: string
}
export const TableOfContents = (props: TableOfContentsProps) => {
  const minLevel = useMemo(() => {
    return props.list.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0
  }, [props.list])

  return (
    <aside className='py-3'>
      <div className='sticky top-28'>
        <h3 className='md:text-xl 3xl:text-2xl'>Table of Contents</h3>
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
      </div>
    </aside>
  )
}
