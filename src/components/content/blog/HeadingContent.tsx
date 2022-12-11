import { twclsx } from '@/libs'
import { dateFormat, dateStringToISO } from '@/libs/intl'

import { LabelBlog } from './LabelBlog'

import { HiOutlineCalendar, HiOutlineClock, HiOutlineEye } from 'react-icons/hi'

type HeadingContentProps = {
  title: string
  summary: string
  published: string
  postViews: number
  est_read?: string
  topics: string[]
}

const config: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}

export const HeadingContent: React.FunctionComponent<HeadingContentProps> = (props) => {
  return (
    <section>
      <h1 className={twclsx('max-w-prose', 'text-3xl md:text-5xl')}>{props.title}</h1>

      <div className='flex items-center space-x-2.5 mt-8 mb-4'>
        {props.topics.map((topic) => (
          <LabelBlog key={props.title + topic} type={topic} />
        ))}
      </div>

      <div className={twclsx('flex flex-col', 'gap-4', 'md:flex-row md:items-center md:justify-between')}>
        <div className={twclsx('flex items-center', 'gap-4')}>
          <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
            <HiOutlineClock className={twclsx('text-lg')} />
            <p>{props.est_read}</p>
          </div>

          <div className={twclsx('flex items-center', 'gap-2', 'text-sm md:text-base')}>
            <HiOutlineEye className={twclsx('text-lg')} />
            {props.postViews > 0 ? <p>{props.postViews} views</p> : <p>—</p>}
          </div>
        </div>
        <div className={twclsx('flex items-center', 'gap-2')}>
          <HiOutlineCalendar className={twclsx('text-lg')} />
          <time className={twclsx('text-sm md:text-base')} dateTime={dateStringToISO(props.published)}>
            {dateFormat(props.published, undefined, config)}
          </time>
        </div>
      </div>

      <hr className={twclsx('mt-8 border-theme-300 dark:border-theme-700')} />
    </section>
  )
}
