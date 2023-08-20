import { PostTag } from '@/components/post/post-tag'

export const TagList = (props: { tags: string[] }) => {
  return (
    <div className='flex flex-wrap gap-1 gap-y-1.5 mt-4 mb-8'>
      {props.tags.map((item) => (
        <PostTag key={`tag-choose-${item}`} tag={item} />
      ))}
    </div>
  )
}
