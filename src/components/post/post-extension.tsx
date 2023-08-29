import { Skeleton } from '@/components/skeleton'

import { getComments } from '@/app/api/post/comment/utils'

import { PostCommentEditor } from './post-comment'
import { PostReactionList } from './post-reaction'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PostCommentList = dynamic(() =>
  import('./post-comment/post-comment-list').then((m) => ({ default: m.PostCommentList })),
)

export const PostExtension = async (props: { slug: string }) => {
  const [comments] = await getComments(props.slug)

  return (
    <section className='max-w-prose mt-8 pt-2 border-t border-base-300 dark:border-base-800'>
      <PostReactionList />

      <Suspense
        fallback={
          <div className='space-y-4'>
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-32 w-full' />
          </div>
        }
      >
        <PostCommentList comments={comments ?? []} slug={props.slug} />
      </Suspense>

      <PostCommentEditor />
    </section>
  )
}
