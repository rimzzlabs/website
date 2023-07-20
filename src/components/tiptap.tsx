'use client'

import { type Editor, EditorContent } from '@tiptap/react'
import { P, match } from 'ts-pattern'

type TiptapProps = {
  editor: Editor | null
  className?: string
}

export const Tiptap = (props: TiptapProps) => {
  return match(props.editor)
    .with(P.nullish, () => null)
    .otherwise((editor) => {
      return <EditorContent {...props} editor={editor} />
    })
}
