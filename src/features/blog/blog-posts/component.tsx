import { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { BlogPostsItem } from './bp-item'

export type BlogProps = {
  posts: PostFrontMatter[]
}

export const BlogPosts = (props: BlogProps) => {
  return (
    <ul className={tw('flex flex-col', 'divide-y divide-base-200 dark:divide-base-800')}>
      {props.posts.map((post) => {
        return <BlogPostsItem key={post.slug} {...post} />
      })}
    </ul>
  )
}
