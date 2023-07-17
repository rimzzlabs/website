import { PostPublishedLabel, PostReadTimeLabel, PostViewsLabel } from '@/components/post'

import type { PostFrontMatterWithViews } from '@/domains/post/type'

export const BlogPostHeader = (props: PostFrontMatterWithViews) => {
  return (
    <section className='pt-10 xs:pt-16 md:pt-24'>
      <h1 className='mb-8'>{props.title}</h1>

      <div className='flex items-center my-2'>
        <PostPublishedLabel iconSize={18} publishedAt={props.publishedAt} />
        <span className='mx-2'>—</span>
        {props.est_read && (
          <PostReadTimeLabel tooltipId='reading-time' est_read={props.est_read} iconSize={18} />
        )}
      </div>

      <PostViewsLabel iconSize={18} slug={props.slug} views={props.views} />
    </section>
  )
}
