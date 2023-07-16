import type { TocList } from '@/components/table-of-contents'
import { TableOfContents } from '@/components/table-of-contents'

import type { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

type Props = React.PropsWithChildren<{
  frontMatter: PostFrontMatter
  toc: TocList
}>

export const BlogPostMainContent = (props: Props) => {
  return (
    <section className='lg:grid lg:grid-cols-[auto,20rem] lg:gap-7 2xl:gap-10'>
      <article className={tw('w-full', 'prose dark:prose-invert')}>{props.children}</article>

      <TableOfContents list={props.toc} slug={props.frontMatter.slug} />
    </section>
  )
}
