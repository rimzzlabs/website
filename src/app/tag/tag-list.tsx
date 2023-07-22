import { PostTag } from '@/components/post/post-tag'

import type { PostTag as PostTagType } from '@/domains/post'

export const TagList = (props: { tags: PostTagType[] }) => {
  return (
    <div className='flex flex-wrap gap-1 gap-y-1.5 mt-4 mb-8'>
      {props.tags.map((item) => (
        <PostTag key={`tag-choose-${item}`} tag={item} />
      ))}
    </div>
  )
}
