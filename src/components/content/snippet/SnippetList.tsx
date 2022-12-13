import { SnippetItem } from './SnippetItem'

import { useId } from 'react'
import { Snippet } from 'rizkicitra'

type Props = {
  snippets: Snippet[]
  title: string
  description: string
}

export const SnippetList: React.FunctionComponent<Props> = (props) => {
  const id = useId()
  return (
    <section className='py-16'>
      <h2 className='mb-1 md:mb-3'>{props.title}</h2>
      <p className='mb-6 md:mb-8'>{props.description}</p>

      <div className='flex flex-col w-full'>
        {props.snippets.length > 0 &&
          props.snippets.map((snippet) => <SnippetItem key={id + snippet.slug} {...snippet} />)}
      </div>
    </section>
  )
}
