import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { getPostsByTag } from '@/domains/post/utils'
import { createMetadata } from '@/domains/seo'

import { TagHero, TagList, TagPosts } from '@/features/tag'
import { MainLayout } from '@/layouts'

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
    description: 'Search blog post based on tag me provide',
  })
}

export default async function Page(props: PageProps) {
  const searchParams = props.searchParams as SearchParamsTag

  const posts = await getPostsByTag(searchParams.tag)

  if (!posts) {
    throw new Error('Something went wrong and it is my fault')
  }

  return (
    <>
      <Header />
      <MainLayout className='pt-16'>
        <TagHero tag={searchParams?.tag} />
        <TagList />
        <TagPosts posts={posts} />
      </MainLayout>

      <Footer />
    </>
  )
}
