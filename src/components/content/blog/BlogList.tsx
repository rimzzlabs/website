import { BlogItem } from './BlogItem'

import type { Blog } from 'rizkicitra'

type BlogListProps = {
  posts: Blog[]
  title: string
}

export const BlogList: React.FunctionComponent<BlogListProps> = (props) => {
  return (
    <section className='py-8 md:py-16'>
      <h2 className='mb-3'>{props.title}</h2>

      {props.posts.length > 0 && (
        <div className='flex flex-col'>
          {props.posts.map((post) => {
            return <BlogItem key={post.slug} {...post} />
          })}
        </div>
      )}
    </section>
  )
}
