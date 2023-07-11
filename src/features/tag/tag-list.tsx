import { PostTag } from '@/components/post/post-tag'

import type { PostTag as PostTagType } from '@/domains/post'

const list: Array<PostTagType> = [
  'react.js',
  'next.js',
  'jotai',
  'user experience',
  'dev experience',
  'personal branding',
  'personal growth',
]

export const TagList = () => {
  return (
    <div className='flex flex-wrap gap-1 gap-y-1.5 mt-4 mb-8'>
      {list.map((item) => (
        <PostTag key={`tag-choose-${item}`} tag={item} />
      ))}
    </div>
  )
}
