import type { PostFrontMatter } from '@/domains/post'

import { PostCard } from './post-card'

import { P, match } from 'ts-pattern'

export const LatestPostList = (props: { posts: PostFrontMatter[] }) => {
  const content = match([props.posts, props.posts.length])
    .with([P.array(), 0], () => (
      <p className='mt-8 text-center'>Currently There are no posts available</p>
    ))
    .with([P.array().select(), P.gt(0)], (posts) => (
      <>
        <p className='mb-8'>Here are my latest posts you might be interested in reading.</p>

        <div className='flex flex-col divide-y divide-base-200 dark:divide-base-800'>
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </>
    ))
    .otherwise(() => null)

  return (
    <section className='my-4'>
      <h2 className='mb-2'>Latest Posts</h2>
      {content}
    </section>
  )
}
