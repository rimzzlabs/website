import { tw } from '@/utils/tw'

import { PostCard } from './post-card'

import type { Post } from 'contentlayer/generated'
import React, { Fragment } from 'react'
import { P, match } from 'ts-pattern'

type TProps = {
  posts: Post[]
  placeholder?: React.FunctionComponent
  title?: string
  className?: string
  headingLevel?: 'h2' | 'h3'
}

export const PostList = (props: TProps) => {
  const placeholder = match(props.placeholder)
    .with(P.nullish, () => <Fragment />)
    .otherwise((Placeholder) => <Placeholder />)

  const title = match(props.title)
    .with(P.nullish, () => null)
    .otherwise((content) => <h2 className='mb-2'>{content}</h2>)

  const content = match([props.posts, props.posts.length])
    .with([P.array(), 0], () => (
      <p className='mt-8 text-center'>Currently There are no posts available</p>
    ))
    .with([P.array().select(), P.gt(0)], (posts) => (
      <div className='flex flex-col divide-y divide-base-200 dark:divide-base-800'>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} headingLevel={props.headingLevel} />
        ))}
      </div>
    ))
    .otherwise(() => null)

  return match(props.posts.length)
    .with(0, () => placeholder)
    .otherwise(() => (
      <section className={tw(props.className)}>
        {title}
        {content}
      </section>
    ))
}
