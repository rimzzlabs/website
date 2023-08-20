import { getTableOfContents } from '@/utils/post'

import { TocItems } from './toc-items'

import { P, match } from 'ts-pattern'

export type TocList = Array<{ url: string; text: string; level: number }>

export const TableOfContents = async (props: { rawBody: string }) => {
  const toc = getTableOfContents(props.rawBody)

  return match(toc)
    .with(P.not(P.nullish).select(), (list) => {
      return (
        <aside className='py-2 hidden lg:block'>
          <div className='sticky top-28'>
            <h3 className='md:text-xl 3xl:text-2xl'>Table of Contents</h3>
            <TocItems list={list} />
          </div>
        </aside>
      )
    })
    .otherwise(() => (
      <aside className='py-2 hidden lg:block'>
        <div className='sticky top-28'>
          <p>Cannot get table of contents</p>
        </div>
      </aside>
    ))
}
