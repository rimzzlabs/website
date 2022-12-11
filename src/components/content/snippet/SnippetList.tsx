import { SnippetItem } from './SnippetItem'

import { useId } from 'react'
import { Snippet } from 'rizkicitra'

type Props = {
  snippets: Snippet[]
  title: string
}

export const SnippetList: React.FunctionComponent<Props> = (props) => {
  const id = useId()
  return (
    <section className='py-8 md:py-16'>
      <h2 className='mb-3 md:mb-5'>{props.title}</h2>

      <div className='flex flex-col w-full'>
        {props.snippets.length > 0 &&
          props.snippets.map((snippet) => <SnippetItem key={id + snippet.slug} {...snippet} />)}
      </div>
    </section>
  )
}
