import { getTableOfContents } from '@/utils/ssr/get-toc'

import { TocItem } from './toc-item'

import { P, match } from 'ts-pattern'

export type TocList = Array<{ url: string; text: string; level: number }>

type TableOfContentsProps = {
  slug: string
}
export const TableOfContents = async (props: TableOfContentsProps) => {
  const res = await getTableOfContents(`src/domains/post/content/${props.slug}.mdx`)

  return match(res)
    .with([P.not(P.nullish).select(), P.nullish], (list) => {
      const minLevel = list.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0

      return (
        <aside className='py-2 hidden lg:block'>
          <div className='sticky top-28'>
            <h3 className='md:text-xl 3xl:text-2xl'>Table of Contents</h3>
            <ul className='flex flex-col mt-4 space-y-2 text-sm'>
              {list.map((toc, i) => {
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
    })
    .otherwise(([, err]) => (
      <aside className='py-2 hidden lg:block'>
        <div className='sticky top-28'>
          <p>{err?.message ?? 'Cannot get table of contents'}</p>
        </div>
      </aside>
    ))
}
