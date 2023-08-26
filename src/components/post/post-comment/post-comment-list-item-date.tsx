'use client'

import { formatDistance } from '@/utils/date'

import { memo, useEffect, useState } from 'react'

export const PostComentListItemDate = memo((props: { createdAt: string }) => {
  const [date, setDate] = useState(formatDistance(props.createdAt))

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setDate(formatDistance(props.createdAt))
    }, 1000)

    return () => clearInterval(timeoutId)
  }, [props.createdAt])

  return (
    <span className='font-sembold text-sm ml-auto text-base-500'>
      <time dateTime={props.createdAt}>{date}</time>
    </span>
  )
})

PostComentListItemDate.displayName = 'PostComentListItemDate'
