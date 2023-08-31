import { PostList } from '@/components/post/post-list'

import { compose } from '@/utils/common'
import { createMetadata } from '@/utils/create-metadata'
import { filterPublishedPosts, getLatestPosts, getPostTags, getPostsByTag } from '@/utils/post'

import { MainLayout } from '@/layouts'

import { TagList } from './tag-list'

import { allPosts } from 'contentlayer/generated'
import type { ParsedUrlQuery } from 'querystring'
import { P, match } from 'ts-pattern'

type PageProps = {
  params: Record<string, string | undefined>
  searchParams: Record<string, string | undefined>
}

type SearchParamsTag = ParsedUrlQuery & {
  tag?: string
}

export async function generateMetadata(props: PageProps) {
  const searchParams = props.searchParams as SearchParamsTag
  const title = match(searchParams.tag)
    .with(P.not(P.nullish), (tag) => 'Tag: ' + tag)
    .otherwise(() => 'Tags')

  return createMetadata({
    title,
    canonical: 'tag',
    description: 'Search blog post based on tag me provide',
  })
}

export default async function Page(props: PageProps) {
  const searchParams = props.searchParams as SearchParamsTag
  const filteredAllPosts = compose(filterPublishedPosts, getLatestPosts)(allPosts)
  const posts = getPostsByTag(filteredAllPosts, searchParams.tag)
  const tags = getPostTags(filteredAllPosts)

  const title = match(searchParams.tag)
    .with(P.not(P.nullish), (tag) => <h1 className='title mb-2'>Tag: {tag}</h1>)
    .otherwise(() => <h1 className='title mb-2'>Tag</h1>)

  return (
    <MainLayout className='pt-16'>
      <section className='mb-8'>
        {title}
        <p>You can filter my post based on the available tags I provide.</p>
      </section>

      <TagList tags={tags} />

      <PostList
        posts={posts}
        className='my-4'
        headingLevel='h2'
        placeholder={() => <p>Nothing to see here yet</p>}
      />
    </MainLayout>
  )
}
