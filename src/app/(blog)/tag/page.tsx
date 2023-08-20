import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { createMetadata } from '@/utils/create-metadata'
import { getPostsByTag } from '@/utils/post'

import { MainLayout } from '@/layouts'

import { TagList } from './tag-list'
import { TagPosts } from './tag-posts'

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

async function getTags() {
  return match(allPosts)
    .with(P.nullish, () => [])
    .with(P.array(), (posts) => {
      return posts
        .map((post) => post.tags)
        .flat()
        .reduce((acc, cur) => {
          if (!acc.includes(cur)) acc.push(cur)
          return acc
        }, [] as string[])
    })
    .exhaustive()
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
  const posts = getPostsByTag(allPosts, searchParams.tag)
  const tags = await getTags()

  const title = match(searchParams.tag)
    .with(P.not(P.nullish), (tag) => <h1 className='title mb-2'>Tag: {tag}</h1>)
    .otherwise(() => <h1 className='title mb-2'>Tag</h1>)

  if (!posts) {
    throw new Error('Something went wrong and it is my fault')
  }

  return (
    <>
      <Header />
      <MainLayout className='pt-16'>
        <section className='mb-8'>
          {title}
          <p>You can filter my post based on the available tags I provide.</p>
        </section>
        <TagList tags={tags} />
        <TagPosts posts={posts} />
      </MainLayout>

      <Footer />
    </>
  )
}
