'use client'

import { Tiptap } from '@/components/tiptap'

import { postComment } from '@/domains/comment/post-comment'

import { tw } from '@/utils/tw'

import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useRef, useState } from 'react'
import { experimental_useFormStatus as useForm } from 'react-dom'
import { TbLoader2 } from 'react-icons/tb'

export const CommentEditor = (props: { slug: string }) => {
  const [body, setBody] = useState('')
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: tw(
          'w-full h-28 md:h-32 p-2 overflow-y-auto',
          'border rounded transition',
          'bg-base-100 dark:bg-base-800',
          'border-base-300 dark:border-base-700',
          'outline-none focus:border-base-400 dark:focus:border-base-600',
        ),
      },
    },
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: { class: 'text-sm' },
        },
        dropcursor: {
          class: 'text-base-800 dark:text-base-200 w-0.5',
        },
        code: {
          HTMLAttributes: {
            class: tw(
              'border rounded text-sm p-1',
              'before:hidden after:hidden bg-base-100 dark:bg-base-800',
              'border-base-300 dark:border-base-700',
            ),
          },
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Type your comment ...',
        emptyEditorClass: tw(
          'before:content-[attr(data-placeholder)]',
          'before:absolute before:top-2 before:left-2',
          'before:text-base-800/40 dark:before:text-base-200/40 before:font-normal',
          'before:pointer-events-none',
        ),
      }),
    ],
    onUpdate({ editor }) {
      const content = editor.getHTML()
      setBody(content)
    },
  })

  const ref = useRef<HTMLFormElement>(null)
  const { pending } = useForm()

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const body = formData.get('body')
        if (!!body) {
          await postComment({
            body: body.toString(),
            slug: props.slug,
          })
          ref.current?.reset()
          editor?.can().clearContent(true)
        }
      }}
      className='max-w-prose space-y-1.5'
    >
      <Tiptap editor={editor} />
      <input name='body' hidden value={body} readOnly required />

      <button
        disabled={pending || !body}
        className='flex items-center justify-center max-w-max space-x-2 py-1.5 px-3.5 text-sm rounded disabled:opacity-60 disabled:cursor-not-allowed bg-primary-600 text-white ml-auto'
      >
        {pending && <TbLoader2 className='animate-spin mr-2' />}
        <span>Comment</span>
      </button>
    </form>
  )
}
