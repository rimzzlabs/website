import { type PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { BlogPublishedAt } from '@/features/blog/blog-published-at'
import { BlogReadingTime } from '@/features/blog/blog-reading-time'

export const BlogPostHeader = (props: PostFrontMatter) => {
  return (
    <section
      className={tw(
        'pt-10 xs:pt-16 md:pt-24',
        'mb-4 pb-4 border-b',
        'border-b-base-200 dark:border-b-base-800',
      )}
    >
      <h1 className='mb-[1em]'>{props.title}</h1>

      <div
        className={tw(
          'flex flex-col',
          'sm:flex-row sm:items-center',
          'space-y-2 sm:space-y-0 sm:space-x-3',
        )}
      >
        <BlogPublishedAt iconSize={18} publishedAt={props.publishedAt} />
        {props.est_read && (
          <BlogReadingTime tooltipId='reading-time' est_read={props.est_read} iconSize={18} />
        )}
      </div>
    </section>
  )
}
