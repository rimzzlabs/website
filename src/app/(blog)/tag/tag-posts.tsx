import { PostCard } from '@/components/post'

import type { Post } from 'contentlayer/generated'
import { P, match } from 'ts-pattern'

export const TagPosts = (props: { posts: Post[] }) => {
  const posts = match(props.posts)
    .with(P.array(), (posts) => {
      return match(posts.length)
        .with(P.gte(1), () => (
          <ul className='my-4 divide-y divide-base-200 dark:divide-base-800'>
            {posts.map((post) => (
              <PostCard key={`based-tag-${post.slug}`} clickableTags={false} {...post} />
            ))}
          </ul>
        ))
        .otherwise(() => (
          <div>
            <p>Select a tag to filter the posts</p>
          </div>
        ))
    })
    .exhaustive()

  const postsLength = match(props.posts)
    .with(P.nullish, () => <p className='font-semibold'>Showing 0 result.</p>)
    .with(P.array(), (posts) =>
      match(posts.length)
        .with(P.gt(1), (length) => <p className='font-semibold'>Showing {length} results.</p>)
        .otherwise((length) => <p className='font-semibold'>Showing {length} result.</p>),
    )
    .exhaustive()

  return (
    <div>
      {postsLength}
      {posts}
    </div>
  )
}
