import { UnstyledLink } from '@/UI/links'

import { numberToCompact } from '@/libs/intl'

import { LabelBlog } from './LabelBlog'

import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi'
import type { Blog } from 'rizkicitra'

export const BlogItem: React.FunctionComponent<Blog> = (props) => {
  const urlPost = `/blog/${props.slug}`

  return (
    <div className='w-full mb-5 md:mb-7 last:mb-0'>
      <h3>
        <UnstyledLink
          className='border-b-2 border-dashed border-transparent hover:border-theme-500 dark:hover:border-theme-300'
          href={urlPost}
        >
          {props.title}
        </UnstyledLink>
      </h3>

      <div className='flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:items-center md:justify-between mt-2.5 mb-4'>
        {props.topics.length > 0 && (
          <div className='flex items-center space-x-2.5'>
            {props.topics.map((topic) => (
              <LabelBlog key={topic} type={topic} />
            ))}
          </div>
        )}

        <div className='inline-flex flex-col md:flex-row md:items-center md:space-x-3'>
          <div className='inline-flex items-center space-x-2'>
            <HiOutlineClock className='w-4 h-4' />
            <span className='text-sm font-semibold'>{props.est_read ?? '0 Min'}</span>
          </div>

          {props.displayViews && (
            <div className='inline-flex items-center space-x-2'>
              <HiOutlineEye className='w-4 h-4' />
              <span className='text-sm font-semibold'>
                {props.views ? numberToCompact(props.views) + ' views' : '0 views'}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className='max-w-prose'>{props.summary}</p>
    </div>
  )
}
