import { PostFrontMatter } from '@/post/contents/type'
import { GetContents } from '@/utils/ssr/get-contents'

import { HomeLatestPostList } from './hlp-list'

type Props = {
  posts: Array<GetContents<PostFrontMatter>>
}

export const HomeLatestPost = (props: Props) => {
  return (
    <section className='mt-16'>
      <h2>Latest Post</h2>
      <p className='max-w-prose mt-3 mb-4'>
        Always feel free to browse my latest post article for a few enjoyable reads.
      </p>

      <HomeLatestPostList posts={props.posts} />
    </section>
  )
}
