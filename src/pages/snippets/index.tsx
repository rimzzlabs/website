import Card from '@/components/atoms/Card'
import IconFinder from '@/components/atoms/IconFinder'
import UnstyledLink from '@/components/atoms/UnstyledLink'
import Hero from '@/components/mollecules/Hero'
import Layout from '@/components/templates/Layout'

import { Snippets } from '@/data/snippets/snippets.type'
import { getSnippets } from '@/helpers/getSnippets'
import { getMetaData } from '@/libs/metaData'
import { getNewestSnippets } from '@/libs/sortSnippets'
import { twclsx } from '@/libs/twclsx'

import { GetStaticProps, NextPage } from 'next'

interface SnippetPageProps {
  snippets: Array<Snippets>
}

const meta = getMetaData({
  title: 'Code Snippets',
  description: `A collection of code snippets that I always use to get started with something. Mostly about frontend technology, such as CSS and JavaScript, and/or getting started to build something.`,
  keywords: ['Snippet', 'Code Snippet', 'rizkicitra.dev'],
  og_image:
    'https://og-image.vercel.app/**Blog%20%E2%80%94%20Rizki%20M%20Citra**%3Cbr%20%2F%3ETalks%20about%20Frontend%20Development%20Related%20Topics.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg',
  og_image_alt: 'Snippets — Rizki M Citra',
  slug: '/snippets',
  type: 'website'
})

const SnippetPage: NextPage<SnippetPageProps> = ({ snippets }) => {
  return (
    <Layout {...meta}>
      <Hero title={meta.title as string} description={meta.description as string} />

      <section className={twclsx('mt-10')}>
        <h2 className={twclsx('mb-8')}>Collections</h2>
        {snippets.length > 0 && (
          <div className={twclsx('grid grid-cols-1', 'md:grid-cols-2', 'flex-auto gap-4')}>
            {snippets.map((s) => (
              <Card key={s.title}>
                <div className={twclsx('relative', 'w-full h-full p-4', 'bg-theme-50 dark:bg-theme-900')}>
                  <div
                    className={twclsx(
                      'inline-flex items-center justify-center',
                      'p-2 border rounded-full',
                      'border-theme-200 dark:border-theme-800'
                    )}
                  >
                    <IconFinder type={s.tech} className={twclsx('w-5 h-5')} />
                  </div>
                  <h4 className={twclsx('mt-4 mb-3')}>{s.title}</h4>
                  <p className={twclsx('max-w-prose')}>{s.description}</p>

                  <UnstyledLink href={`/snippets/${s.slug}`} className={twclsx('absolute inset-0')} title={s.title}>
                    <span className={twclsx('sr-only')}>{s.title}</span>
                  </UnstyledLink>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<SnippetPageProps> = async () => {
  const snippets = (await getSnippets()).sort(getNewestSnippets)

  return {
    props: {
      snippets
    }
  }
}

export default SnippetPage
