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

  return (
    <div className={tw('py-4 first-of-type:pt-0 last-of-type:pb-0', props.className)}>
      {/* <div className='flex flex-col space-y-1 sm:space-y-unset sm:flex-row sm:items-center sm:space-x-2'> */}
      <div className='flex items-center space-x-4'>
        <PostPublishedLabel publishedAt={props.publishedAt} />

        <PostReadTimeLabel
          tooltipId={`home-post-${props.slug}-read-time`}
          est_read={props.est_read}
        />
      </div>

      {heading}

      {match(props.tags)
        .with(P.array(), () => (
          <div className='flex items-center space-x-1'>
            {props.tags.map((tag) => (
              <PostTag key={`tag-${tag}-${props.slug}`} tag={tag} />
            ))}
          </div>
        ))
        .otherwise(() => null)}
    </div>
  )
}
