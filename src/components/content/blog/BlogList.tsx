import { BlogItem } from './BlogItem'

import type { Blog } from 'rizkicitra'

type BlogListProps = {
  posts: Blog[]
  title: string
  displayViews?: boolean
}

export const BlogList: React.FunctionComponent<BlogListProps> = ({ displayViews, ...props }) => {
  return (
    <section className='py-8 md:py-16'>
      <h2 className='mb-4 md:mb-7'>{props.title}</h2>

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
