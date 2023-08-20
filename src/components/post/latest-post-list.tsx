import { getLatestPosts } from '@/utils/post'

import { PostCard } from './post-card'

import { allPosts } from 'contentlayer/generated'
import { P, match } from 'ts-pattern'

export const LatestPostList = () => {
  const posts = getLatestPosts(allPosts).slice(0, 3)

  const content = match([posts, posts.length])
    .with([P.array(), 0], () => (
      <p className='mt-8 text-center'>Currently There are no posts available</p>
    ))
    .with([P.array().select(), P.gt(0)], (posts) => (
      <div className='flex flex-col divide-y divide-base-200 dark:divide-base-800'>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    ))
    .otherwise(() => null)

  return (
    <section className='my-4'>
      <h2 className='mb-2'>Latest Posts</h2>
      {content}
    </section>
  )
}
