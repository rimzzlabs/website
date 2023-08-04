import type { PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { PostPublishedLabel } from './post-published-label'
import { PostReadTimeLabel } from './post-read-time-label'
import { PostTag } from './post-tag'

import Link from 'next/link'
import { createElement } from 'react'
import { P, match } from 'ts-pattern'

type PostCardProps = PostFrontMatter & {
  className?: string
  headingLevel?: 'h2' | 'h3' | 'h4'
  clickableTags?: boolean
}

const headingProps = { className: 'mt-1 mb-4' }

export const PostCard = (props: PostCardProps) => {
  const heading = match([props.headingLevel, headingProps])
    .with(['h2', P.select()], (headingProps) =>
      createElement('h2', headingProps, <Link href={`/blog/${props.slug}`}>{props.title}</Link>),
    )
    .with(['h3', P.select()], (headingProps) =>
      createElement('h2', headingProps, <Link href={`/blog/${props.slug}`}>{props.title}</Link>),
    )
    .with(['h4', P.select()], (headingProps) =>
      createElement('h2', headingProps, <Link href={`/blog/${props.slug}`}>{props.title}</Link>),
    )
    .with([P.nullish, P.select()], (headingProps) =>
      createElement('h3', headingProps, <Link href={`/blog/${props.slug}`}>{props.title}</Link>),
    )
    .exhaustive()

  const tags = match([props.tags, props.clickableTags])
    .with([P.array(), P.nullish], ([tags]) => (
      <div className='flex items-center space-x-1'>
        {tags.map((tag) => (
          <PostTag key={`tag-${tag}-${props.slug}`} tag={tag} />
        ))}
      </div>
    ))
    .with([P.array(), P.shape(true)], ([tags]) => (
      <div className='flex items-center space-x-1'>
        {tags.map((tag) => (
          <PostTag key={`tag-${tag}-${props.slug}`} tag={tag} />
        ))}
      </div>
    ))
    .with([P.array(), P.shape(false)], ([tags, clickable]) => (
      <div className='flex items-center space-x-1'>
        {tags.map((tag) => (
          <PostTag clickable={clickable} key={`tag-${tag}-${props.slug}`} tag={tag} />
        ))}
      </div>
    ))
    .otherwise(() => null)

  return (
    <div className={tw('py-4 first-of-type:pt-0 last-of-type:pb-0', props.className)}>
      <div className='flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0'>
        <PostPublishedLabel publishedAt={props.publishedAt} />
        <span className='mx-1 hidden xs:block'>•</span>
        <PostReadTimeLabel
          tooltipId={`home-post-${props.slug}-read-time`}
          est_read={props.est_read}
        />
      </div>

      {heading}

      {tags}
    </div>
  )
}
