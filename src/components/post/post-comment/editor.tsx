'use client'

import { GithubSigninButton } from '@/components/github-signin-button'
import { Tiptap } from '@/components/tiptap'

import { useAuth } from '@/hooks/use-auth'
import { usePostSlug } from '@/hooks/use-post-slug'
import { useEditorComment } from '@/hooks/useEditorComment'

import { tw } from '@/utils/tw'

import { Loader2Icon, SendIcon } from 'lucide-react'
import { useState } from 'react'
import { P, match } from 'ts-pattern'

type TPostCommentEditorProps<TData> = {
  onSubmitMutation: (props: { body: string; slug: string }) => Promise<TData>
}

export const CommentEditor = <TData,>(props: TPostCommentEditorProps<TData>) => {
  const editor = useEditorComment()
  const slug = usePostSlug()
  const [, isAuthenticated] = useAuth()
  const [btnLoading, setLoading] = useState(false)

  const textCount = editor?.storage?.characterCount?.characters() ?? 0
  const buttonDisabled = btnLoading || !isAuthenticated

  const onSubmitComment = match({
    editor,
    textCount,
  })
    .with({ textCount: P.gt(0), editor: P.not(P.nullish).select() }, (editor) => {
      return async () => {
        const body = editor.getHTML()
        editor.setOptions({ editable: false })
        setLoading(true)
        try {
          await props.onSubmitMutation({ body, slug })
        } catch (err) {
          console.dir(err)
        } finally {
          editor.setOptions({ editable: true })
          editor.commands.clearContent(true)
          setLoading(false)
        }
      }
    })
    .otherwise(() => {
      return () => {
        return
      }
    })

  const renderEditor = match(isAuthenticated)
    .with(true, () => {
      return <Tiptap className='mb-2' editor={editor} />
    })
    .otherwise(() => (
      <div
        className={tw(
          'flex flex-col items-center justify-center space-y-3',
          'rounded-md border h-32 mb-2',
          'bg-base-100 dark:bg-base-800',
          'border-base-200 dark:border-base-700',
        )}
      >
        <p>Sign in to comment!</p>
        <GithubSigninButton />
      </div>
    ))

  return (
    <div className='mt-4'>
      {renderEditor}

      <div className='flex items-start'>
        <p className='text-sm font-medium text-base-500 dark:text-base-400'>{textCount}/500</p>
        <button
          onClick={onSubmitComment}
          disabled={buttonDisabled}
          className={tw(
            'inline-flex items-center space-x-1.5',
            'ml-auto rounded text-white',
            'h-8 px-3 text-sm',
            buttonDisabled && 'bg-base-700 dark:bg-base-800',
            !buttonDisabled && 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800',
          )}
        >
          {btnLoading ? (
            <Loader2Icon size='0.9rem' className='animate-spin' />
          ) : (
            <SendIcon size='0.9rem' />
          )}
          <span>{btnLoading ? 'Posting' : 'Comment'}</span>
        </button>
      </div>
    </div>
  )
}
