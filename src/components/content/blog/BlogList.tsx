import { twclsx } from '@/libs'

import { BlogItem } from './BlogItem'

import type { Blog } from 'rizkicitra'

type BlogListProps = {
  posts: Blog[]
  title: string
  description: string
  displayViews?: boolean
  className?: string
}

export const BlogList: React.FunctionComponent<BlogListProps> = ({ displayViews, ...props }) => {
  return (
    <section className={twclsx('py-16', props.className)}>
      <h2 className='mb-1 md:mb-3'>{props.title}</h2>
      <p className='mb-6 md:mb-8'>{props.description}</p>

      {props.posts.length > 0 && (
        <div className='flex flex-col'>
          {props.posts.map((post) => {
            return <BlogItem key={post.slug} {...post} displayViews={displayViews} />
          })}
        </div>
      )}
    </section>
  )
}
