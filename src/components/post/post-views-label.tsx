'use client'

import { CustomTooltip } from '@/components/custom-tooltip'

import { compactNumber } from '@/utils/number'

import { usePostViews } from '@/queries/post'

import { ActivityIcon, AlertCircleIcon, HelpCircleIcon } from 'lucide-react'
import { P, match } from 'ts-pattern'

type Props = {
  views: number
  slug: string
  iconSize?: number
}

export const PostViewsLabel = (props: Props) => {
  const query = usePostViews({ initialData: props.views, slug: props.slug })

  const getWording = (views: number) => {
    return match(views)
      .with(0, () => "You're the first reader")
      .otherwise((views) => `${compactNumber(views)} people viewed this post`)
  }

  const tooltipContent = match(query.data)
    .with(
      P.gt(0),
      () => 'This result is based on page visit, it might be different from the actual views.',
    )
    .otherwise(() => 'You might be the first reader of this blog.')

  const tooltipId = match(props.slug)
    .with(P.string, (slug) => `tooltip-views-${slug}`)
    .otherwise(() => 'toooltip-content')

  const content = match(query)
    .with({ status: 'error' }, () => (
      <div className='flex items-center space-x-1'>
        <AlertCircleIcon />
        <span>Something went wrong</span>
      </div>
    ))
    .with({ status: 'success', data: P.select() }, ({ data }) => (
      <div className='flex items-center'>
        <ActivityIcon size={props?.iconSize ?? 14} />
        <span className='mx-1 text-sm'>{getWording(data.views)}</span>
        <HelpCircleIcon data-tooltip-id={tooltipId} className='cursor-help self-start' size={13} />
        <CustomTooltip content={tooltipContent} id={tooltipId} />
      </div>
    ))
    .otherwise(() => null)

  return content
}
