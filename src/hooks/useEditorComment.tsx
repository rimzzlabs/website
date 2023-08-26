import { tw } from '@/utils/common'

import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const useEditorComment = () => {
  return useEditor({
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
        placeholder: 'Leave a comment ...',
        emptyEditorClass: tw(
          'relative',
          'before:absolute before:left-0',
          'before:content-[attr(data-placeholder)]',
          'before:text-base-300 before:dark:text-base-500',
          'before:font-medium before:pointer-events-none',
        ),
      }),
    ],
    editorProps: {
      attributes: {
        class: tw(
          'prose prose-sm',
          'prose-p:mt-[0.25em]',
          'max-w-none px-4 py-2.5 min-h-[8rem] max-h-72',
          'dark:prose-invert prose-neutral',
          'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
          'prose-h1:mb-[0.45em] prose-h2:mb-[0.45em] prose-h2:mt-[0.25em] prose-h3:mb-[0.45em]',
          'outline-none rounded-md text-sm',
          'border transition overflow-y-auto',
          'bg-base-100 dark:bg-base-800',
          'border-base-200 dark:border-base-700',
          'focus:ring-1 ring-base-300 dark:ring-base-600',
        ),
      },
    },
  })
}
