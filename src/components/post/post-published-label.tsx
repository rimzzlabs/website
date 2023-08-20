import { formatReadableDate, formatToISO } from '@/utils/date'

import { CalendarIcon } from 'lucide-react'

type Props = {
  publishedAt: string
  iconSize?: number
}

export const PostPublishedLabel = (props: Props) => {
  const ISOdate = formatToISO(props.publishedAt)

  return (
    <span className='flex items-center text-sm'>
      <CalendarIcon size={props?.iconSize ?? 14} />

      <time className='ml-1' dateTime={ISOdate}>
        {formatReadableDate(props.publishedAt)}
      </time>
    </span>
  )
}
