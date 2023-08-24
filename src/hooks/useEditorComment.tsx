import { tw } from '@/utils/tw'

import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'

export const useEditorComment = (isSub?: boolean) => {
  const placeholder = isSub ? 'Leave a reply ...' : 'Leave a comment ...'
  const session = useSession()
  const editor = useEditor({
    editable: session.status === 'authenticated',
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CharacterCount.configure({
        limit: 500,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: clsx(
          'relative',
          'before:absolute before:left-0',
          'before:content-[attr(data-placeholder)]',
          'before:text-base-500 before:font-medium before:pointer-events-none',
        ),
      }),
    ],
    editorProps: {
      attributes: {
        class: tw(
          'prose prose-sm dark:prose-invert prose-neutral max-w-none',
          'outline-none',
          'rounded-md text-sm border transition',
          'overflow-y-auto',
          'bg-base-100 dark:bg-base-800',
          'border-base-200 dark:border-base-700',
          'focus:ring-1 ring-primary-300 dark:ring-primary-600/60',
          'prose-p:mt-[0.25em]',
          'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
          'prose-h1:mb-[0.45em] prose-h2:mb-[0.45em] prose-h2:mt-[0.25em] prose-h3:mb-[0.45em]',
          isSub && 'p-2 max-h-24',
          !isSub && 'p-4 min-h-[8rem] max-h-72',
        ),
      },
    },
  })

  return editor
}
