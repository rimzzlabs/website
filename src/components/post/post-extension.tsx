import { PostCommentEditor, PostCommentList } from './post-comment'
import { PostReactionList } from './post-reaction'

export const PostExtension = () => {
  return (
    <section className='max-w-prose mt-8 pt-2 border-t border-base-300 dark:border-base-800'>
      <PostReactionList />

      <PostCommentList />

      <PostCommentEditor />
    </section>
  )
}
