import { PostCard } from '@/components/post'

import { getLatestPosts } from '@/utils/post'
import { tw } from '@/utils/tw'

import { allPosts } from 'contentlayer/generated'

export const BlogPosts = () => {
  const posts = getLatestPosts(allPosts)

  return (
    <div className={tw('divide-y divide-base-200 dark:divide-base-800 mt-4 mb-8')}>
      {posts.map((post) => {
        return <PostCard key={post.slug} headingLevel='h2' {...post} />
      })}
    </div>
  )
}
