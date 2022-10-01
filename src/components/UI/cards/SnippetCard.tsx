import { IconStack } from '@/components/content'

import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs'

import { WrapperCard } from './WrapperCard'

import type { Snippet } from 'rizkicitra'

export const SnippetCard: React.FunctionComponent<Snippet> = (props) => {
  return (
    <WrapperCard>
      <div className='relative flex flex-col h-full p-3 bg-theme-50 dark:bg-theme-900'>
        <h3>{props.title}</h3>
        <p className='my-4'>{props.summary}</p>

        <IconStack className='ml-auto mt-auto w-10 h-10' type={props.topic} />

        <UnstyledLink
          title={`See snippet ${props.title}`}
          href={`/snippet/${props.slug}`}
          className={twclsx('absolute inset-0 rounded')}
        >
          <span className={twclsx('sr-only')}>See snippet {props.title}</span>
        </UnstyledLink>
      </div>
    </WrapperCard>
  )
}
