import { UnstyledLink } from '@/components/link'
import { ColorLink } from '@/components/link/color'

import { type PostFrontMatter } from '@/domains/post'

import { tw } from '@/utils/tw'

import { BlogPublishedAt } from '../blog-published-at'
import { BlogReadingTime } from '../blog-reading-time'

import { TbArrowRight } from 'react-icons/tb'

export const BlogPostsItem = (props: PostFrontMatter) => {
  const href = `/blog/${props.slug}`
  const title = `Read ${props.title}`
  const tooltipId = `read-time-${props.slug}`

  const linkProps = { href, title }

  return (
    <li className='group py-6 first-of-type:pt-unset'>
      <div
        className={tw(
          'flex flex-col',
          'sm:flex-row sm:items-center',
          'text-sm space-y-1 sm:space-y-0',
        )}
      >
        <BlogPublishedAt publishedAt={props.publishedAt} iconSize={16} />

        {props.est_read && <span className='hidden sm:inline-block mx-2'>•</span>}

        <BlogReadingTime iconSize={16} tooltipId={tooltipId} est_read={props.est_read} />
      </div>

      <h2 className='mt-1 mb-6'>
        <UnstyledLink {...linkProps}>{props.title}</UnstyledLink>
      </h2>

      <p className='mb-3'>{props.description}</p>

      <ColorLink {...linkProps} className='md:max-w-max [&:hover>svg]:ml-2' flex>
        <span>Read More</span>
        <TbArrowRight className='opacity-0 group-hover:opacity-100 transition-all ml-1' />
      </ColorLink>
    </li>
  )
}
