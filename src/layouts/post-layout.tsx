import { BackTopButton } from '@/components/back-top-button'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TableOfContents, type TocList } from '@/components/table-of-contents'

import { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { BlogPostComment, BlogPostHeader } from '@/features/blog'

type PostLayoutProps = {
  className?: string
  frontMatter: PostFrontMatter
  toc: TocList
}
export const PostLayout = (props: React.PropsWithChildren<PostLayoutProps>) => {
  return (
    <>
      <BackTopButton />
      <Header className='lg:max-w-5xl' />
      <main id='skip-content' className={tw('layout lg:max-w-5xl', props.className)}>
        <BlogPostHeader {...props.frontMatter} />

        <section className='lg:grid lg:grid-cols-[auto,20rem] lg:gap-7 2xl:gap-10'>
          <article className={tw('w-full', 'prose dark:prose-invert')}>{props.children}</article>

          <TableOfContents list={props.toc} slug={props.frontMatter.slug} />
        </section>

        <BlogPostComment />
      </main>
      <Footer className='lg:max-w-5xl' />
    </>
  )
}
