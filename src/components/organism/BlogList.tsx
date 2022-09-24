import { getMostPopularBlog } from '@/libs/sortBlog'
import { twclsx } from '@/libs/twclsx'

import { Loading } from '../mollecules/Loading'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Blog } from 'rizkicitra'

const BlogCard = dynamic(() => import('@/components/mollecules/BlogCard'), { suspense: true })
const Card = dynamic(() => import('@/components/atoms/Card'), { suspense: true })

type BlogListProps = {
  blogs: Blog[]
  limit?: boolean
  mostView?: boolean
  displayViews?: boolean
}

const BlogList: React.FunctionComponent<BlogListProps> = (props) => {
  if (props.mostView) props.blogs.sort(getMostPopularBlog)

  if (props.limit) {
    return (
      <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
        <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
          {props.blogs.slice(0, 2).map((b) => (
            <Card key={b.slug}>
              <BlogCard displayViews={props.displayViews} {...b} />
            </Card>
          ))}
        </Suspense>
      </div>
    )
  }

  return (
    <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
      <Suspense fallback={<Loading containerSize='full' spinnerSize='md' containerStyle='h-56' />}>
        {props.blogs.map((b) => (
          <Card key={b.slug}>
            <BlogCard displayViews={props.displayViews} {...b} />
          </Card>
        ))}
      </Suspense>
    </div>
  )
}

export default BlogList
