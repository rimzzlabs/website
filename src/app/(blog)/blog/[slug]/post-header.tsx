import { PostPublishedLabel, PostReadTimeLabel, PostViewsLabel } from '@/components/post'

import { getPostViews } from '@/utils/post'

import type { Post } from 'contentlayer/generated'

export const PostHeader = async (props: Post) => {
  const views = await getPostViews(props.slug)

  return (
    <section className='pt-10 xs:pt-16 md:pt-24'>
      <h1 className='mb-8'>{props.title}</h1>

      <div className='flex items-center my-2'>
        <PostPublishedLabel iconSize={16} publishedAt={props.publishedAt} />
        <span className='mx-2'>—</span>
        <PostReadTimeLabel tooltipId='reading-time' estRead={props.readingTime} iconSize={16} />
      </div>

      <PostViewsLabel iconSize={16} slug={props.slug} views={views} />
    </section>
  )
}
