import { formatDate, formatDateToISO } from '@/utils/date'

import { CalendarIcon } from 'lucide-react'

type Props = {
  publishedAt: string
  iconSize?: number
}

export const PostPublishedLabel = (props: Props) => {
  return (
    <span className='flex items-center text-sm'>
      <CalendarIcon size={props?.iconSize ?? 14} />

      <time
        title={formatDate(props.publishedAt, 'full')}
        className='ml-1'
        dateTime={formatDateToISO(props.publishedAt)}
      >
        {formatDate(props.publishedAt, 'day-month')}
      </time>
    </span>
  )
}
