import Label from '@/components/atoms/Label'
import UnstyledLink from '@/components/atoms/UnstyledLink'

import { Blogs } from '@/data/blog/blog.type'

import clsx from 'clsx'

interface BlogCardProps extends Blogs {
  views?: number
}

const BlogCard: React.FC<BlogCardProps> = ({ title, topics, ...props }) => {
  return (
    <div className={clsx('relative flex flex-col p-3 h-full', 'bg-theme-50 dark:bg-theme-900')}>
      <h3 className='mb-2 md:mb-4'>{title}</h3>
      <div className={clsx('flex items-center justify-between mt-auto w-full')}>
        {topics.length > 0 && (
          <div className={clsx('flex items-center space-x-2 md:space-x-3')}>
            {topics.map((topic, index) => (
              <Label type={topic} key={topic + index} />
            ))}
          </div>
        )}
        <div className='flex flex-col gap-2 text-sm'>
          {/* <span>{props.views} views</span> */}
          <span>{props.est_read}</span>
        </div>
      </div>

      <UnstyledLink className={clsx('absolute inset-0')} href={'/blog/' + props.slug} title={title} />
    </div>
  )
}

export default BlogCard
