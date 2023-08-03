import { Skeleton } from '@/components/skeleton'
import { TableOfContents } from '@/components/table-of-contents'

import type { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { Suspense } from 'react'

type Props = React.PropsWithChildren<{
  frontMatter: PostFrontMatter
}>

const Fallback = () => (
  <div className='hidden w-full lg:flex lg:flex-col'>
    <Skeleton className='h-8 w-full mb-4' />
    <Skeleton className='w-3/4 h-4 mb-2' />
    <Skeleton className='w-1/3 h-4 mb-2' />
    <Skeleton className='w-11/12 h-4 mb-2' />
    <Skeleton className='w-9/12 h-4 mb-2' />
    <Skeleton className='w-full h-4 mb-2' />
    <Skeleton className='w-8/12 h-4 mb-2' />
    <Skeleton className='w-10/12 h-4' />
  </div>
)

export const PostContent = (props: Props) => {
  return (
    <section className='lg:grid lg:grid-cols-[auto,20rem] lg:gap-7 2xl:gap-10'>
      <article className={tw('w-full', 'prose prose-neutral dark:prose-invert')}>
        {props.children}
      </article>

      <Suspense fallback={<Fallback />}>
        <TableOfContents slug={props.frontMatter.slug} />
      </Suspense>
    </section>
  )
}
