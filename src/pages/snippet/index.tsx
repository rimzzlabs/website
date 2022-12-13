import { SnippetList } from '@/components/content/snippet'

import { EmptyResult } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'

import { getContents } from '@/services'

import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getNewestSnippet } from '@/libs/sorters'

import { useSearchSnippet } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import type { Snippet } from 'rizkicitra'

type SnippetProps = {
  snippets: Array<Snippet>
}

const meta = getMetaPage({
  title: 'Snippet',
  description: `A collection of helpful snippets to help you, including myself to spin up the development. Remember, Do Not Repeat Yourself.`,
  keywords: [],
  og_image: generateOgImage({
    title: 'Snippet - rizkicitra.dev',
    subTitle:
      'A collection of helpful snippets to help you, including myself to spin up the development. Remember, Do Not Repeat Yourself.'
  }),
  og_image_alt: 'Snippet — rizkicitra.dev',
  slug: '/snippet',
  type: 'website'
})

const SnippetIndexPage: NextPage<SnippetProps> = ({ snippets = [] }) => {
  const search = useSearchSnippet(snippets)

  return (
    <LayoutPage {...meta}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={search.handleChange} value={search.query} />

      {snippets.length > 0 && search.query === '' ? (
        <SnippetList
          snippets={snippets}
          title='Explore Them'
          description="I've put a collection of snippets that are available on my site. These snippets were created by me, as well as some awesome contributors on GitHub."
        />
      ) : null}

      {search.query !== '' && search.filteredSnippet.length > 0 && (
        <SnippetList
          snippets={search.filteredSnippet}
          title='Search Snippet'
          description="I've found some possible results for your search."
        />
      )}

      {search.query !== '' && search.filteredSnippet.length === 0 && <EmptyResult />}
    </LayoutPage>
  )
}

export const getStaticProps: GetStaticProps<SnippetProps> = async () => {
  const res = await getContents<Snippet>('/snippet')
  const snippets = res.map((s) => s.header).sort(getNewestSnippet)

  return {
    props: {
      snippets
    }
  }
}

export default SnippetIndexPage
