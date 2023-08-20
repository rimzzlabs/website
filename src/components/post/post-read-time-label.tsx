'use client'

import { CustomTooltip } from '@/components/custom-tooltip'

import { ClockIcon, HelpCircleIcon } from 'lucide-react'
import { P, match } from 'ts-pattern'

type Props = {
  estRead: {
    minutes: number
    words: number
  }
  tooltipId: string
  iconSize?: number
}

export const PostReadTimeLabel = (props: Props) => {
  const estReadTime = (minutes: number) => {
    return match(Math.floor(minutes))
      .with(P.gte(11), () => `10+ mins. read`)
      .with(P.gte(2), (m) => `${m} mins. read`)
      .with(P.lt(1), () => 'A brief read')
      .otherwise((m) => `${m} min. read`)
  }

  return match(props.estRead)
    .with({ minutes: P.number, words: P.number }, (value) => (
      <span className='flex items-center'>
        <ClockIcon size={props?.iconSize ?? 14} />
        <span className='mx-1 text-sm'>{estReadTime(value.minutes)}</span>
        <HelpCircleIcon
          data-tooltip-id={props.tooltipId}
          size={14}
          className='self-start cursor-help'
        />

        <CustomTooltip place='bottom' id={props.tooltipId} clickable>
          <p className='text-sm text-white'>
            This post has <strong>{value.words} words</strong>, reading time is calculated using{' '}
            <strong>225 WPM reading speeds</strong>.
          </p>
        </CustomTooltip>
      </span>
    ))
    .otherwise(() => null)
}
