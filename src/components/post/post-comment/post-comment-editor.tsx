'use client'

import { useAuth } from '@/hooks/use-auth'
import { useEditorComment } from '@/hooks/use-editor-comment'
import { usePostSlug } from '@/hooks/use-post-slug'

import { tw } from '@/utils/common'

import { useMutateComment } from '@/queries/comment'
import { signInDialogAtom } from '@/store/signin'

import { EditorContent } from '@tiptap/react'
import { useSetAtom } from 'jotai'
import { Loader2Icon, SendIcon } from 'lucide-react'
import { useState } from 'react'
import { P, match } from 'ts-pattern'

export const PostCommentEditor = () => {
  const editor = useEditorComment()
  const slug = usePostSlug()
  const isAuthenticated = useAuth()
  const [btnLoading, setLoading] = useState(false)
  const mutation = useMutateComment()
  const setDialog = useSetAtom(signInDialogAtom)

  const count = editor?.storage?.characterCount?.characters() ?? 0
  const buttonDisabled = btnLoading || !isAuthenticated || count === 0

  const openSigninDialog = () => setDialog(true)

  const onSubmitComment = async () => {
    if (!editor) return
    const body = editor.getHTML()
    editor.setOptions({ editable: false })
    setLoading(true)

    try {
      await mutation.mutateAsync({ body, slug })
      editor.commands.clearContent(true)
    } catch (err) {
      console.error(err)
    } finally {
      editor.setOptions({ editable: true })
      setLoading(false)
    }
  }

  const textCount = match({ isAuthenticated, count })
    .with({ isAuthenticated: false }, () => null)
    .otherwise(({ count }) => (
      <p className='text-sm font-medium text-base-500 dark:text-base-400'>{count}/500</p>
    ))

  const content = match({ isAuthenticated, editor })
    .with({ isAuthenticated: true, editor: P.not(P.nullish).select() }, (editor) => {
      return <EditorContent className='mb-2' editor={editor} />
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
        <button
          onClick={openSigninDialog}
          className={tw(
            'inline-flex items-center',
            'h-8 px-4 text-sm max-w-max',
            'rounded transition',
            'bg-primary-600 text-white',
            'hover:bg-primary-700 active:bg-primary-800',
          )}
        >
          Sign In
        </button>
      </div>
    ))

  const button = match({ isAuthenticated, btnLoading, onSubmitComment, buttonDisabled })
    .with({ isAuthenticated: false }, () => null)
    .otherwise(({ btnLoading, buttonDisabled, onSubmitComment }) => (
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
        {match(btnLoading)
          .with(true, () => <Loader2Icon size='0.9rem' className='animate-spin' />)
          .otherwise(() => (
            <SendIcon size='0.9rem' />
          ))}
        <span>
          {match(btnLoading)
            .with(true, () => 'Sending')
            .otherwise(() => 'Send')}
        </span>
      </button>
    ))

  return (
    <div className='mt-4'>
      {content}

      <div className='flex items-start'>
        {textCount}

        {button}
      </div>
    </div>
  )
}
