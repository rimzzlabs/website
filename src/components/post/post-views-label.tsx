'use client'

import { CustomTooltip } from '@/components/custom-tooltip'

import { compactNumber } from '@/utils/number'

import { TbActivityHeartbeat, TbQuestionCircle } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type Props = {
  views: number
  slug: string
  iconSize?: number
}

export const PostViewsLabel = (props: Props) => {
  const word = match(props.views)
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

  return (
    <span className='flex items-center text-base-600 dark:text-base-400'>
      <TbActivityHeartbeat size={props?.iconSize ?? 14} />
      <span className='mx-1 text-sm'>{word}</span>
      <TbQuestionCircle data-tooltip-id={tooltipId} className='cursor-help' size={14} />

      <CustomTooltip content={tooltipContent} id={tooltipId} />
    </span>
  )
}
