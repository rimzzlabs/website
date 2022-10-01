import { SnippetCard } from '@/UI/cards'
import { EmptyResult, Spinner } from '@/UI/common'
import { Searchbar } from '@/UI/inputs'
import { Hero, LayoutPage } from '@/UI/templates'

import { getContents } from '@/services'

import { twclsx } from '@/libs'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getNewestSnippet } from '@/libs/sorters'

import { useSearch } from '@/hooks'

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
  const search = useSearch<Snippet[]>(snippets, 'snippet')
  return (
    <LayoutPage {...meta}>
      <Hero title={meta.title as string} description={meta.description as string} />
      <Searchbar onChange={search.handleChange} value={search.query} />

      {snippets.length > 0 && search.query.length === 0 ? (
        <section>
          <h2 className='mb-4'>Explore Them</h2>
          <div className={twclsx('grid grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto')}>
            {snippets.map((s) => (
              <SnippetCard key={s.slug} {...s} />
            ))}
          </div>
        </section>
      ) : null}

      {search.query.length > 0 && (
        <section>
          <h2 className='mb-4'>Search Result</h2>

          {search.filteredData.length > 0 ? (
            <div className={twclsx('grid-cols-1 md:grid-cols-2', 'gap-4 flex-auto', !search.isPending && 'grid')}>
              {search.isPending ? (
                <Spinner containerSize='full' spinnerSize='md' containerStyle='h-40' />
              ) : (
                search.filteredData.map((s) => <SnippetCard key={s.slug} {...s} />)
              )}
            </div>
          ) : (
            <EmptyResult />
          )}
        </section>
      )}
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
