import { getLatestPosts } from '@/domains/post'

import { Skeleton } from '../skeleton'
import { PostCard } from './post-card'

export const LatestPostList = async () => {
  const posts = await getLatestPosts()

  if (!posts) return null

  return (
    <section className='my-4'>
      <h2 className='mb-2'>Latest Posts</h2>
      <p className='mb-8'>Here are my latest posts you might be interested in reading.</p>

      <div className='flex flex-col divide-y divide-base-200 dark:divide-base-800'>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  )
}

export const LatestPostListLoading = () => (
  <section className='my-4'>
    <h2 className='mb-2'>Latest Posts</h2>
    <p className='mb-8'>Here are my latest posts you might be interested in reading.</p>
    <div className='flex flex-col space-y-2 divide-base-200 dark:divide-base-800'>
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
    </div>
  </section>
)
