import { PostCard } from '@/components/post'

import type { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

export type BlogProps = {
  posts: PostFrontMatter[]
}

export const BlogPosts = (props: BlogProps) => {
  return (
    <ul className={tw('divide-y divide-base-200 dark:divide-base-900 mt-4 mb-8')}>
      {props.posts.map((post) => {
        return <PostCard key={post.slug} headingLevel='h2' {...post} />
      })}
    </ul>
  )
}
