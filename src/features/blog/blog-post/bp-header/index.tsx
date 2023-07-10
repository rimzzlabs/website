import { PostPublishedLabel, PostReadTimeLabel } from '@/components/post'
import { PostTag } from '@/components/post/post-tag'

import { type PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

export const BlogPostHeader = (props: PostFrontMatter) => {
  return (
    <section className='pt-10 xs:pt-16 md:pt-24'>
      <h1 className='mb-8'>{props.title}</h1>

      <div className={tw('flex', 'items-center', 'mb-2')}>
        <PostPublishedLabel iconSize={18} publishedAt={props.publishedAt} />
        <span className='mx-2'>—</span>
        {props.est_read && (
          <PostReadTimeLabel tooltipId='reading-time' est_read={props.est_read} iconSize={18} />
        )}
      </div>

      <div className='flex items-center flex-wrap gap-1'>
        <span>Tags:</span>

        {props.tags.map((tag) => (
          <PostTag key={`${props.slug}-tag-${tag}`} tag={tag} />
        ))}
      </div>
    </section>
  )
}
