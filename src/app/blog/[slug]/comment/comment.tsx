import { GithubLoginButton } from '@/components/github-login-button'

import type { Comment } from '@/domains/comment'

import { CommentEditor } from './comment-editor'
import { CommentsLength } from './comment-length'
import { CommentList } from './comment-list'

import type { Session } from 'next-auth'

type CommentProps = {
  slug: string
  comments: Comment[] | null
  session: Session | null
}

export const CommentPost = (props: CommentProps) => {
  return (
    <div className='layout lg:max-w-5xl my-4'>
      <CommentsLength comments={props.comments} />
      <CommentList comments={props.comments} />
      {props.session?.user ? (
        <CommentEditor slug={props.slug} />
      ) : (
        <div className='flex items-center justify-center max-w-prose h28'>
          <GithubLoginButton />
        </div>
      )}
    </div>
  )
}
