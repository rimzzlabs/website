import { UnstyledLink } from '@/UI/links'

import { LabelBlog } from './LabelBlog'

import type { Blog } from 'rizkicitra'

export const BlogItem: React.FunctionComponent<Blog> = (props) => {
  const urlPost = `/blog/${props.slug}`

  return (
    <div className='w-full mb-3 last:mb-0'>
      <h3>
        <UnstyledLink
          className='border-b border-dashed border-transparent hover:border-theme-500 dark:hover:border-theme-300'
          href={urlPost}
        >
          {props.title}
        </UnstyledLink>
      </h3>
      {props.topics.length > 0 && (
        <div className='flex items-center space-x-2.5 my-2 mb-1.5'>
          {props.topics.map((topic) => (
            <LabelBlog key={topic} type={topic} />
          ))}
        </div>
      )}
      <p>{props.summary}</p>
    </div>
  )
}
