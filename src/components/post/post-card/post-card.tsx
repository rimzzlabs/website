'use client'

import { UnstyledLink } from '@/components/link/unstyled'

import { PostFrontMatter } from '@/post/contents/type'
import { compactNumber } from '@/utils/number'

import { TbClockHour3, TbEye } from 'react-icons/tb'

export const PostCard = (props: PostFrontMatter) => {
  const title = `Read "${props.title}"`
  const href = `/blog/${props.slug}`

  return (
    <div>
      <h3 className='mb-2'>
        <UnstyledLink href={href} title={title}>
          {props.title}
        </UnstyledLink>
      </h3>

      <div className='flex items-center space-x-4'>
        {props.est_read && (
          <div className='flex items-center space-x-1.5'>
            <TbClockHour3 />
            <p>{props.est_read}</p>
          </div>
        )}

        <div className='flex items-center space-x-1.5'>
          <TbEye />
          <p>{compactNumber(1000, 10_000)} Views</p>
        </div>
      </div>
    </div>
  )
}
