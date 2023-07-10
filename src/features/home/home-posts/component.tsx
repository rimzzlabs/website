import { PostCard } from '@/components/post'

import type { PostFrontMatter } from '@/domains/post'

type HomePostsProps = {
  posts: PostFrontMatter[]
}

export const HomePosts = (props: HomePostsProps) => {
  return (
    <section className='my-4'>
      <h2 className='mb-2'>Latest Posts</h2>
      <p className='mb-8'>Here are my latest three posts you might be interested in reading.</p>

      <div className='flex flex-col divide-y-2 divide-base-200 dark:divide-base-900'>
        {props.posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  )
}
