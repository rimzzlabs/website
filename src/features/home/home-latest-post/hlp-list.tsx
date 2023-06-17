import { PostCard } from '@/components/post/post-card'

import { PostFrontMatter } from '@/post/contents/type'
import { GetContents } from '@/utils/ssr/get-contents'

type Props = { posts: Array<GetContents<PostFrontMatter>> }
export const HomeLatestPostList = (props: Props) => {
  return (
    <div className='flex flex-col space-y-3'>
      {props.posts.map((post) => (
        <PostCard key={post.frontMatter.slug} {...post.frontMatter} />
      ))}
    </div>
  )
}
