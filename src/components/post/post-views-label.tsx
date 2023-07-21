'use client'

import { CustomTooltip } from '@/components/custom-tooltip'
import { Skeleton } from '@/components/skeleton'

import { usePostViews } from '@/domains/queries/post'

import { compactNumber } from '@/utils/number'

import { TbActivityHeartbeat, TbQuestionCircle } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type Props = {
  views: number
  slug: string
  iconSize?: number
}

export const PostViewsLabel = (props: Props) => {
  const query = usePostViews({ initialData: props.views, slug: props.slug })

  const views = match<[(typeof query)['status'], typeof query.data], number>([
    query.status,
    query.data,
  ])
    .with(['success', P.select()], (value) => value)
    .otherwise(([, views]) => views)

  const word = match(views)
    .with(0, () => "You're the first reader")
    .otherwise((views) => `${compactNumber(views)} people viewed this post`)

  const tooltipContent = match(props.views)
    .with(
      P.gt(0),
      () => 'This result is based on page visit, it might be different from the actual views.',
    )
    .otherwise(() => 'You might be the first reader of this blog.')

  const tooltipId = match(props.slug)
    .with(P.string, (slug) => `tooltip-views-${slug}`)
    .otherwise(() => 'toooltip-content')

  const queryState = {
    loading: query.isLoading,
    fetching: query.isFetching,
    refetching: query.isRefetching,
  }

  const content = match(queryState)
    .with({ loading: false, fetching: false, refetching: false }, () => (
      <>
        <TbActivityHeartbeat size={props?.iconSize ?? 14} />
        <span className='mx-1 text-sm'>{word}</span>
        <TbQuestionCircle data-tooltip-id={tooltipId} className='cursor-help' size={14} />
        <CustomTooltip content={tooltipContent} id={tooltipId} />
      </>
    ))
    .otherwise(() => null)

  return (
    <span className='flex items-center text-base-600 dark:text-base-400'>
      {(queryState.loading || queryState.fetching || queryState.refetching) && (
        <>
          <Skeleton className='w-4 h-4 mr-1' />
          <Skeleton className='w-40 h-3.5' />
        </>
      )}

      {content}
    </span>
  )
}
