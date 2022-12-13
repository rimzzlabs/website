import { UnstyledLink } from '@/components/UI/links'

import { IconStack } from '../portfolio'

import { Snippet } from 'rizkicitra'

export const SnippetItem: React.FunctionComponent<Snippet> = (props) => {
  const slugURL = '/snippet/' + props.slug

  return (
    <div className='flex py-3 w-full'>
      <div className='w-full pr-4'>
        <h3>
          <UnstyledLink
            className='border-b-2 border-dashed border-transparent hover:border-theme-500 dark:hover:border-theme-300'
            href={slugURL}
          >
            {props.title}
          </UnstyledLink>
        </h3>
        <p className='max-w-prose mb-3'>{props.summary}</p>
      </div>

      <IconStack className='w-9 h-9 md:w-10 md:h-10' type={props.topic} />
    </div>
  )
}
