'use client'

import { formatReadableDate, formatToISO } from '@/utils/date'

import { TbCalendarEvent } from 'react-icons/tb'

type Props = {
  publishedAt: string
  iconSize?: number
}

export const BlogPublishedAt = (props: Props) => {
  const ISOdate = formatToISO(props.publishedAt)

  return (
    <span className='flex items-center cursor-help'>
      <TbCalendarEvent size={props?.iconSize ?? 18} />

      <time className='ml-1' dateTime={ISOdate}>
        {formatReadableDate(props.publishedAt)}
      </time>
    </span>
  )
}
